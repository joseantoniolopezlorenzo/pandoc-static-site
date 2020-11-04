#!/bin/sh

if [ -z "$1" ]
then
  echo "Mensaje para el commit"
  exit 1
fi
##npm run build
git add . && git commit -m $1 ##&& git push