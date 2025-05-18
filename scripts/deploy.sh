#!/bin/bash
# scripts/deploy.sh - Deploy iTex Corporate Portal на VPS

set -e

# Parameters
LABEL=$1
if [ -z "$LABEL" ]; then
    echo "Error: Label is required"
    exit 1
fi

echo "🚀 Starting deployment of VPS: $LABEL"

# Create directories
mkdir -p ~/itex-${LABEL}/{certs,config,logs,scripts}

# Generate SSL certificates
echo "📢 Generating SSL certificates..."
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -k out ~/itex-${LABEL}/certs/server.key \
    -out ~/itex-${LABEL}/certs/server.crt \
    -subj "/C=RU/ST=Moscow/L=Moscow/O=iTex Group/CN=${LABEL}.itex-cloud.com"

# Generate CEO and MCP keys
echo "📣 Generating CEO and MCP keys..."
openssl genrsa -out ~/itex-${LABEL}/certs/ceo_private.key 2048
openssl rsa -in ~/itex-${LABEL}/certs/ceo_private.key -pubout -out ~/itex-${LABEL}/certs/ceo_public.pem

openssl genrsa -out ~/itex-${LABEL}/certs/mcp_private.key 2048
openssl rsa -in ~/itex-${LABEL}/certs/mcp_private.key -pubout -out ~/itex-${LABEL}/certs/mcp_public.pem

# Generate JWT secret
JWT_SECRET$(openssl rand -base64 32)
echo "$JWT_SECRET" > ~/itex-${LABEL}/config/jwt_secret

echo "✔ Deployment files for $LABEL prepared successfully"
echo "📃 To complete deployment, transfer these files to your VPS and run:"
echo "   cd ${LABEL} && docker-compose up -d"
