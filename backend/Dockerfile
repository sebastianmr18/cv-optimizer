FROM node:20-slim AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:20-slim
RUN groupadd --system appuser \
 && useradd --system --gid appuser --home /nonexistent --shell /usr/sbin/nologin appuser

WORKDIR /app
COPY --from=builder --chown=appuser:appuser /app/dist ./dist
COPY --from=builder --chown=appuser:appuser /app/package.json ./
COPY --from=builder --chown=appuser:appuser /app/package-lock.json ./
RUN npm ci --omit=dev

RUN mkdir -p /app/uploads \
&& chown -R appuser:appuser /app/uploads

USER appuser
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "dist/index.js"]