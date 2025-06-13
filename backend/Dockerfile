FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build
RUN npm prune --production

CMD ["npm", "run", "start:prod"]
