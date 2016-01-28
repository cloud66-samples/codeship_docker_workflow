#!/bin/bash

function health_check_mysql {
  mysqladmin -h "${MYSQL_ADDRESS}" ping --user="${MYSQL_USERNAME}" --password="${MYSQL_PASSWORD}"
}

count=0
until ( health_check_mysql )
do
  ((count++))
  if [ ${count} -gt 90 ]
  then
    echo "Services didn't become ready in time"
    exit 1
  fi
  sleep 1
done

node app.js