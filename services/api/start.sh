#!/bin/bash

function test_mysql {
  mysqladmin -h "${MYSQL_ADDRESS}" ping --user="${MYSQL_USERNAME}" --password="${MYSQL_PASSWORD}"
}

count=0
until ( test_mysql )
do
  ((count++))
  if [ ${count} -gt 50 ]
  then
    echo "Services didn't become ready in time"
    exit 1
  fi
  sleep 0.1
done

node app.js