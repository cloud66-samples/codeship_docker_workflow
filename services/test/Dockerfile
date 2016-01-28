FROM node:5.5.0-slim
MAINTAINER Daniël van Gils

#setting up directory structure for the node.js app
ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

#download mysql for connectivity check
RUN apt-get update && apt-get install -y mysql-client

#download all depencies
ADD package.json $APP_HOME/
RUN npm install
RUN npm install -g mocha

#add the source code
ADD . $APP_HOME