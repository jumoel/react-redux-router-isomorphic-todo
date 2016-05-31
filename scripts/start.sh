#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Start the development environment"
  exit
fi

docker-compose up -d db
docker-compose run --rm --service-ports web
