
FROM phusion/passenger-nodejs
MAINTAINER Daniël van Gils

#setting up directory structure for the node.js app
ENV APP_HOME /home/app
WORKDIR $APP_HOME

#download all depencies
ADD api/package.json $APP_HOME/
RUN npm install
RUN npm install -g mocha

#add the source code
ADD api/. $APP_HOME

#for redeploy our docker to on cloud66
ADD redeploy_hook_cloud66.sh $APP_HOME

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#run our server
RUN rm -f /etc/service/nginx/down
CMD nginx

