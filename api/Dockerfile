
FROM phusion/passenger-nodejs
MAINTAINER Daniël van Gils

#setting up directory structure for the node.js app
ENV APP_HOME /home/app
WORKDIR $APP_HOME

#download all depencies
ADD package.json $APP_HOME/
RUN npm install

#add the source code
ADD . $APP_HOME

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#make sure nginx is startinf
RUN rm -f /etc/service/nginx/down

RUN rm /etc/nginx/sites-enabled/default
ADD nginx/webapp.conf /etc/nginx/sites-enabled/webapp.conf

