#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Start a shell in the web container"
  exit
fi

docker-compose run web /bin/bash
