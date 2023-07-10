# multy stage dockerfile
FROM node:lts-alpine as node_modules_dev
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm ci

FROM node:lts-alpine as node_modules_prod
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:lts-alpine as builder
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
# RUN npm i -g typescript
# Bundle app source
COPY . .
# Install dependencies
# RUN npm ci
COPY --from=node_modules_dev /app/node_modules ./node_modules
RUN npm run db:generate
# Build the app
RUN npm run build

# nodejs express dockerfile
FROM node:lts-alpine as production
# Create app directory
WORKDIR /app
# Install app dependencies
# RUN apk add --no-cache bash
# RUN apk add --no-cache curl
COPY package*.json ./
# Install dependencies
# RUN npm ci --omit=dev
# Bundle app source
COPY --from=builder /app/dist ./dist
COPY --from=node_modules_prod /app/node_modules ./node_modules
COPY prisma ./prisma
RUN npm run db:generate
# Copy .env file
COPY .env.production .env
# Expose port 3333
EXPOSE 3333
# Run the app
# CMD [ "npm", "start" ]