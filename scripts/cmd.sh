#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Run a command in the web container"
  exit
fi

docker-compose run web /bin/bash -c "$@"
