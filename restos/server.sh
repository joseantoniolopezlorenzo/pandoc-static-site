#!/usr/bin/env bash

#
# Author: Jake Zimmerman <jake@zimmerman.io>
#
# A simple script to launch a web server in this folder and start watchman.
#

set -euo pipefail

python3 -m http.server "${PORT:-8000}" --directory dist &
http_server_pid="$!"

watchman-make -p 'src/*.md' -r 'make convertir'
kill "$http_server_pid"
