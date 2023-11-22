FROM node:14-alpine
WORKDIR /srv/app
COPY . .
RUN apk update
RUN apk add --no-cache tzdata
RUN npm i
EXPOSE 8080

CMD ["npm", "run", "start"]