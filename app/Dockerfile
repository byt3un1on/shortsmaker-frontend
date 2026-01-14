# Stage 1: Build
FROM node:18-slim AS builder

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o código e compila
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine

# Copia configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build final (HTML, CSS e JS transpilado)
# Nota: Como o projeto é vanilla, precisamos do index.html, style.css e a pasta dist/ completa
COPY --from=builder /app/index.html /usr/share/nginx/html/
COPY --from=builder /app/style.css /usr/share/nginx/html/
COPY --from=builder /app/favicon.* /usr/share/nginx/html/
COPY --from=builder /app/dist /usr/share/nginx/html/dist
COPY --from=builder /app/src /usr/share/nginx/html/src