# Base image
FROM node:16 AS development

# Create app directory
WORKDIR /usr/src/app

RUN npm install glob rimraf

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install --only=development

# Bundle app source
COPY . .

RUN npm run build

FROM node:16 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

# Start the server using the developer
CMD ["npm", "dist/main"]