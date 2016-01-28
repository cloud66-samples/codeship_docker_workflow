#smallest docker image alive (5mb!)
FROM alpine:3.3

#install curl on alpine
RUN apk add --update curl
RUN apk add --update bash
RUN rm -rf /var/cache/apk/*

#add redeployment hook
ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD redeploy_hook_cloud66.sh $APP_HOME
CMD $APP_HOME/redeploy_hook_cloud66.sh
