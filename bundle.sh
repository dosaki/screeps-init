#!/bin/bash

GAME_LOCATION="$1"
if [[ "$1" == "" ]]; then
    GAME_LOCATION=$(cat main.js.location)
fi

if [[ ! -f "${GAME_LOCATION}" ]]; then
    echo "${GAME_LOCATION} does not point to a file".
    exit 1
fi

rollup --config bundle-config.js
head -n -7 bundle.js > bundle.mod.js
rm bundle.js
echo "" >> bundle.mod.js
echo "module.exports.loop = loop;" >> bundle.mod.js

mv bundle.mod.js "${GAME_LOCATION}"
touch "${GAME_LOCATION}" # Ensure the game picks up the changes
