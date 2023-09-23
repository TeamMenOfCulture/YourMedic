FROM node:18.17.0-alpine
WORKDIR /
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD yarn start

