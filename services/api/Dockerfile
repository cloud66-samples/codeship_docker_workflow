FROM node:5.5.0-slim
MAINTAINER Daniël van Gils

#setting up directory structure for the node.js app
ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

#download nc for connectivity check
RUN apt-get update && apt-get install -y netcat

#download all depencies
ADD package.json $APP_HOME/
RUN npm install

#add the source code
ADD . $APP_HOME

#start the api server
EXPOSE 80
CMD $APP_HOME/start.sh