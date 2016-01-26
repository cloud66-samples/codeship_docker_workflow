
# smallest node.js base image
FROM node:slim
MAINTAINER Daniël van Gils

#setting up directory structure for the node.js app
ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

#download all depencies
ADD api/package.json $APP_HOME/
RUN npm install
RUN npm install -g mocha

#add the source code
ADD api/. $APP_HOME

#for redeploy our docker to on cloud66
ADD redeploy_hook_cloud66.sh $APP_HOME

#run our server
CMD node server
