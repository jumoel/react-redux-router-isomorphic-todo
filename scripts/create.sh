#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Setup the development environment"
  exit
fi

. ./scripts/_functions.sh

# This:
# 2>&1 >/dev/null
# Redirects stderr to stdout and redirects stdout to /dev/null
# aka: Only prints errors

echo "Running setup. Please don't abort."
echo "----------------------------------"
echo ""

# This uses a hack to create the network by asking docker-compose to 'up'
# a non-existing service
echo "Docker: Creating network"
docker-compose up noop 2>/dev/null >/dev/null

echo -e "Docker: Pulling images"
docker-compose pull

echo "Docker: Building images"
docker-compose build

echo "Docker: Creating containers"
docker-compose create

echo "NPM: Clearing local dependencies"
rm -rf ./node_modules

# Remove default output from `npm install` because it is very verbose
echo "NPM: Installing dependencies locally"
npm install &> /dev/null

echo ""
echo "--"
echo "Done setting up."
