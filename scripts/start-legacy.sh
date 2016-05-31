#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Start the legacy development environment"
  exit
fi

docker-compose run --rm --service-ports -e LEGACY_DEV=true web
