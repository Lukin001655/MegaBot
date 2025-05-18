// mcp_client.ts - Edge Function для интеграции с MCP Server

import { createHmac, createHash } from 'crypto';
import fetch from 'node-fetch';
import * as jwt from 'jsonwebtoken';

interface MCPConfig {
  mcpServerUrl: string;
  jwtSecret: string;
  ceoPrivateKey: string;
  mcpPublicKey: string;
  telegramBotToken: string;
  telegramChatId: string;
}

interface MCPCommand {
  command: string;
  label?: string;
  args?: Record<string, string>;
  signature: string;
}

interface MCPResponse {
  status: string;
  message: string;
  data?: any;
}

export class MCPClient {
  private config: MCPConfig;

  constructor(config: MCPConfig) {
    this.config = config;
  }

  private async generateJWT(): Promise<string> {
    const payload = {
      iss: 'telegram-bot',
      exp: Math.floor(Date.now() / 1000) + 600, // 10 minutes
    };

    return jwt.sign(payload, this.config.jwtSecret);
  }

  private signCommand(command: string, label: string): string {
    const data = `${command}:${label}`;
    const hmac = createHmac('sha256', this.config.ceoPrivateKey);
    hmac.update(data);
    return hmac.digest('hex');
  }

  public async executeCommand(command: string, label: string, args?: Record<string, string>): Promise<MCPResponse> {
    try {
      const signature = this.signCommand(command, label);
      const token = await this.generateJWT();

      const mcpCommand: MCPCommand = {
        command,
        label,
        args,
        signature,
      };

      const response = await fetch(`${this.config.mcpServerUrl}/api/v1/command`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(mcpCommand),
      });

      if (!response.ok) {
        throw new Error(`MCP server returned ${response.status}: ${response.statusText}`);
      }

      return await response.json() as MCPResponse;
    } catch (error) {
      return {
        status: 'error',
        message: `Error executing command: ${error.message}`,
      };
    }
  }

  public async getStatus(): Promise<MCPResponse> {
    try {
      const token = await this.generateJWT();
      
      const response = await fetch(`${this.config.mcpServerUrl}/api/v1/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`MCP server returned ${response.status}: ${response.statusText}`);
      }

      return await response.json() as MCPResponse;
    } catch (error) {
      return {
        status: 'error',
        message: `Error getting status: ${error.message}`,
      };
    }
  }

  public async sendTelegramNotification(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.config.telegramBotToken}/sendMessage`;
    const body = {
      chat_id: this.config.telegramChatId,
      text: message,
    };

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }
}
