# MegaBot - iTex GROUP

Intelligent Telegram bot and self-host service integrating:

1. **Knowledge Management System** - search, classify, and visualize corporate documents
2. **Financial Assistant** - expense tracking, project budgets, reimbursements, analytics
3. **DevOps & Self-Deploy Tools** - automated deployment and infrastructure management

## VPS Integration & MCP (Management & Control Protocol)

The bot provides the following commands:

- `/deploy_vps <label>` - Create and deploy a new VPS
- `/register_vps <url>` - Register an existing VPS with the bot
- `/update_vps <label>` - Update the specified VPS
- `/backup_vps <label>` - Backup the specified VPS
- `/mcp_status [label]` - Check status of MCP system or a specific VPS

## System Architecture

| Component            | Technology                    | Purpose                                    |
| -------------------- | ----------------------------- | ---------------------------------------- |
| **MCP Server**        | Docker-container `mcpd` (Go)  | Listens on port 8443, receives requests  |
| **MCP Client (bot)**  | Edge-Function `mcp_client.ts` | Sends encrypted requests, awaits responses |
| **Event Bridge**      | Redis stream                 | Status updates to the bot                 |
| **Auto-Patcher**      | Bash + Watchtower             | Automatic updates and migrations          |

## Setup Instructions

1. SSH by logging in to your VPS
2. Run the installation script
3. Check the status of the MCP server
4. Connect the bot to the MCP server
5. Enjoy automated infrastructure management!
