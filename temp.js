#!/bin/bash

echo "now"; node download.js "AUD_JPY" "2015-04-05T00:00:00Z" "2015-04-05T10:00:00Z" ./data/now.txt

cat ./data/now.txt | uniq > ./data/now-2.txt
