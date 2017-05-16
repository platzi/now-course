FROM node:alpine
LABEL name "platzi-now-api"

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn --prod

COPY db.js /app
COPY pubsub.js /app
COPY resolvers.js /app
COPY schema.js /app
COPY server.js /app

EXPOSE 3000

CMD ["yarn", "start"]
