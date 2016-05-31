#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Rebuild the Docker images"
  exit
fi

echo "Docker: Stopping containers"
docker-compose stop

echo "Docker: Removing old containers"
docker-compose rm -f --all

echo "Docker: Rebuilding containers"
docker-compose build

echo "Docker: Rebuilding services"
docker-compose create
