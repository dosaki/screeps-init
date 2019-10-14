#!/bin/bash

rollup --config bundle-config.js
head -n -7 bundle.js > /c/Users/lordg/AppData/Local/Screeps/scripts/screeps.com/custom/main.js
rm bundle.js
echo "" >> /c/Users/lordg/AppData/Local/Screeps/scripts/screeps.com/custom/main.js
echo "module.exports.loop = loop;" >> /c/Users/lordg/AppData/Local/Screeps/scripts/screeps.com/custom/main.js

touch /c/Users/lordg/AppData/Local/Screeps/scripts/screeps.com/custom/main.js
