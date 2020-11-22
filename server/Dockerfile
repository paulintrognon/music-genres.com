FROM node:13

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 3001

CMD [ "yarn", "start" ]
