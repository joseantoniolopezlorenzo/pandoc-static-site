#!/bin/sh

echo 'Introduzca el mensaje para el commit:'
#leer el dato del teclado y guardarlo en la variable de usuario var1
read var1
npm run build
git add . && git commit -m "${var1}" && git push
git subtree push --prefix dist origin gh-pages