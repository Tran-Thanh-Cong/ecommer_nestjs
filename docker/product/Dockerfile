FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN rm -rf dist

RUN npm rubuildn 

FROM node:16

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./

EXPOSE 5000

CMD ["npm", "run", "start:prod"]