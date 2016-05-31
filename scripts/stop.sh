#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Stop the development environment without destroying it"
  exit
fi

docker-compose stop
