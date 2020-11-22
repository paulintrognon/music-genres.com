# Stage 1 - the build process
FROM node:13 as build-deps

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

# Stage 2 - serve
FROM nginx:latest

COPY --from=build-deps /usr/src/app/build /var/www

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
