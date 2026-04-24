FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y git

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "server.js"]