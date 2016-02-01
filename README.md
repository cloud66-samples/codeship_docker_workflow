# Deliver testable dockerized apps in production at scale with Codeship and Cloud66

Let's assume you already eat all *docker 101 tutorials* for breakfast? You are totally ready to take that briljant app of yours in production! But wait... You maybe wondering how do I test my container based microservices architecture and how does the CI/CD workflow looks like? And last but not least: how the hell do I run my microservices in production?

Your are in for a treat. This blog post will teach you how a proper docker workflow looks like, play with it and make it your own. We guide your through the whole process of docker development, testing microservice architecture and actually run your app in production on any cloud. We finish off how to scale you app to greater heights.

## We need a microservice

Before we can start we need a microservice to work with. Who doesn't love cats? Let's create a very simple API to store cat names in a mysql backend. Oh ok I know, normally you don't want your microservice talk directly to a database. We want loosely coupled services, but that's something we can discuss in a blog another time. 

The **Cats API** has three responsibilities:

* give a list of all the added cats
* add a new cat name 
* remove all cats from the list 

The endpoints of our Cats API look like this:

* `curl -X GET http://<your ip>:3000/api/cats`
* `curl -X POST -d '{"name":"rocky"}' http://<your ip>:3000/api/cats`
* `curl  -X POST -d '{}' http://<your ip>:3000/api/cats/clear`

The **node.js app** with all the things you need can be found on [github](https://github.com/cloud66-samples/codeship_docker_workflow).


## We need tests

I'm using the [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) way of testing. Because every microservices expose a contract/software interface which can be tested from the outside-in. For the node.js test we use `mocha`. For those with a ruby background `mocha` is the node.js equivalent of `rspec`

How this works from a container perspective you may ask? 

* Build all container images for the **Cats API**, **test** and **notify** service
* Run the **Cat API microservice** and start the dependencies the service need. **Mysql** in this case. 
* Wait for those two guys to warmup.
* Run the **test service** against the **Cat API** when everything is up & running
* Notify your Docker stack managed by [Cloud66](http://www.cloud66.com/signup) using the **notify service** to deploy the new **Cats API** when the tests are green.

Enough talking. Let's try it out! 

* `git clone https://github.com/cloud66-samples/codeship_docker_workflow.git cats`
* `cd cats`

The best way to get your microservice architecture up and running is using the `docker-compose` tool. 

* `docker-compose build`
* `docker-compose run test`

Output:
![alt](/content/images/2016/01/Screen-Shot-2016-01-28-at-16-13-02.png)

##Explore the services





