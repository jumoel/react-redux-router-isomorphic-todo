#!/bin/bash

function failed_dep() {
  echo >&2 "This script depends on $1 but it is not installed. Aborting.";
  exit 1;
}

function command_exists() {
  command -v $1 >/dev/null 2>&1

  return $?;
}

function depends_on() {
  command_exists $1 || failed_dep $1
}

function lazy_nvm() {
  command_exists nvm || {
    . $NVMFILE
  }

  nvm "$@"
}

function npm() {
  lazy_nvm exec --silent -- npm "$@"
}

function node() {
  lazy_nvm exec --silent -- node "$@"
}
