FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY admin/package*.json ./admin/

COPY storefront/package*.json ./storefront/

RUN npm run install:all

COPY . .