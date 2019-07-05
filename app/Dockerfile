FROM node:10.14

RUN apt-get update -qq && apt-get install -y yarn

RUN mkdir /dock_app
RUN mkdir /dock_app/public
WORKDIR /dock_app
COPY ./app/package*.json /dock_app/*
COPY ./app/yarn.lock /dock_app/

COPY ./app/ /dock_app/
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]

