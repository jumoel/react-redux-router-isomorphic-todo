#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Stop and destroy the development environment"
  exit
fi

echo "Destroying. Please don't abort."
echo "--"

echo "Docker: Tearing down"
docker-compose down

echo "NPM: Clearing local dependencies"
rm -rf ./node_modules
