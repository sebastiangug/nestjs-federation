FROM node:16-alpine

WORKDIR /app
COPY ./dist/apps/user-service .

ENV NODE_ENV=production
RUN npm i -g pnpm@7.4.1
RUN pnpm config set strict-peer-dependencies false
RUN pnpm i --prod
COPY ./libs/database/prisma ./prisma
RUN npx prisma generate

EXPOSE 8080

ENV PORT=8080
ENV ENVIRONMENT=production

CMD ["node", "main.js"]
