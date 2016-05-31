#!/bin/bash

if [[ $1 == "description" ]]; then
  echo "Display available commands"
  exit
fi

echo -e "Available commands: \n"

for file in ./scripts/**.sh
do
  FILENAME=$(basename "$file")
  SCRIPTNAME=$(basename "$file" .sh)
  if [[ -x $file ]] && [[ $FILENAME != _* ]]; then
    DESCRIPTION=$($file description)
    echo " - $SCRIPTNAME"
    echo "   $DESCRIPTION"
  fi
done
