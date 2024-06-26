FROM node:18

WORKDIR /usr/src

COPY . .

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]
