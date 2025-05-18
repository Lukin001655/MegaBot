# Dockerfile для MCPD (MCP Daemon)
FROM golang:1.19-alpine AS builder

WORKDIR /app
COPY . .

# Установка зависимостей
RUN go mod download

# Компиляция приложения
RUN go build -o mcpd .

# Финальный образ
FROM alpine:latest

# Установка необходимых Анкет
RUN apk add --no-cache bash curl docker-cli openssl ca-certificates

WORKDIR /app
COPY --from=builder /app/mcpd .

# Создание необходимых директорий
RUN mkdir -p /app/certs /app/config /app/logs /app/scripts

# Установка прав на исполнение
RUN chmod +x /app/mcpd

# Команда запуска
CMD ["/app/mcpd"]