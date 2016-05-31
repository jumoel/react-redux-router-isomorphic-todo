#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Update npm packages in the docker images"
  exit
fi

docker-compose run --rm web /bin/bash -c "npm install && npm prune && echo '{\"time\": \"`date`\"}' > restart.json"
