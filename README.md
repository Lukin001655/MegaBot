# iTex MegaBot - MCP System

A comprehensive Telegram-based management and control system for iTex Group infrastructure.

## Overview

iTex MCP System is a complete solution for managing infrastructure and corporate portal through Telegram bot. It provides:

- **Infrastructure Management** - manage VPS, deployments, and services
- **Knowledge Base System** - search and classify corporate documents
- **Financial Management** - expenses, project budgets, and analytics
- **DevOps Automation** - CI/CD, monitoring, and automatic updates

## Architecture

The system consists of the following components:

1. **MCP Server (Go)** - Central component processing commands from Telegram
2. **Telegram Bot** - User interface for interaction
3. **Docker Infrastructure** - Containerized applications for easy deployment
4. **Nginx Integration** - Proxy for hosting web services
5. **Backup System** - Reliable backup and restore system

## Deployment

The system is designed to be deployed with a single command:

```bash
# Deploy to a specific environment
bash scripts/deploy.sh prod-eu
```

See [Quick Start Guide](docs/quickstart.md) for detailed instructions.

## Telegram Bot Commands

- `/deploy_vps <label>` - Automatically deploy a new VPS
- `/update_vps <label>` - Update an existing VPS
- `/rollback_vps <label> <tag>` - Rollback to a previous version
- `/mcp_status` - Check system status
- `/search <query>` - Search documents
- `/cashflow` - View financial reports

## Security

The system implements multiple security mechanisms:

- JWT authentication with short lifetime (10 minutes)
- HMAC signatures for all critical commands
- Whitelist of authorized Telegram users
- Role-based access control

## License

Copyright © 2025 iTex Group. All rights reserved.
