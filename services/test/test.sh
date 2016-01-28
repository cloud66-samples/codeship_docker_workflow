#!/bin/bash

function test_api {
  curl "http://${API_ADDRESS}"
}

function test_mysql {
  mysqladmin -h "${MYSQL_ADDRESS}" ping --user="${MYSQL_USERNAME}" --password="${MYSQL_PASSWORD}"
}

count=0
until ( test_api && test_mysql )
do
  ((count++))
  if [ ${count} -gt 30 ]
  then
    echo "Services didn't become ready in time"
    exit 1
  fi
  sleep 1
done

mocha