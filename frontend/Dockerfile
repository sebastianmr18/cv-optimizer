FROM node:20-slim AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json next.config.ts postcss.config.mjs ./
COPY src/app/globals.css ./src/app/globals.css
COPY src ./src
RUN npm run build

FROM node:20-slim

WORKDIR /app
RUN useradd --no-create-home appuser
COPY --from=builder --chown=appuser:appuser /app/.next ./.next
COPY --from=builder --chown=appuser:appuser /app/package.json ./
COPY --from=builder --chown=appuser:appuser /app/package-lock.json ./
RUN npm ci --omit=dev

USER appuser
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]