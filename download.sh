#!/bin/bash

mkdir -p ./data/$1

echo -n "Downloading $1 2005 data..."; node download.js $1 "2005-01-01T00:00:00Z" "2005-01-01T23:59:59Z" ./data/$1/2005.txt
echo -n "Downloading $1 2006 data..."; node download.js $1 "2006-01-01T00:00:00Z" "2006-01-01T23:59:59Z" ./data/$1/2006.txt
echo -n "Downloading $1 2007 data..."; node download.js $1 "2007-01-01T00:00:00Z" "2007-01-01T23:59:59Z" ./data/$1/2007.txt
echo -n "Downloading $1 2008 data..."; node download.js $1 "2008-01-01T00:00:00Z" "2008-01-01T23:59:59Z" ./data/$1/2008.txt
echo -n "Downloading $1 2009 data..."; node download.js $1 "2009-01-01T00:00:00Z" "2009-01-01T23:59:59Z" ./data/$1/2009.txt
echo -n "Downloading $1 2010 data..."; node download.js $1 "2010-01-01T00:00:00Z" "2010-01-01T23:59:59Z" ./data/$1/2010.txt
echo -n "Downloading $1 2011 data..."; node download.js $1 "2011-01-01T00:00:00Z" "2011-01-01T23:59:59Z" ./data/$1/2011.txt
echo -n "Downloading $1 2012 data..."; node download.js $1 "2012-01-01T00:00:00Z" "2012-01-01T23:59:59Z" ./data/$1/2012.txt
echo -n "Downloading $1 2013 data..."; node download.js $1 "2013-01-01T00:00:00Z" "2013-01-01T23:59:59Z" ./data/$1/2013.txt
echo -n "Downloading $1 2014 data..."; node download.js $1 "2014-01-01T00:00:00Z" "2014-01-01T23:59:59Z" ./data/$1/2014.txt
echo -n "Downloading $1 2015 data..."; node download.js $1 "2015-01-01T00:00:00Z" "2015-01-01T23:59:59Z" ./data/$1/2015.txt

cat ./data/$1/2005.txt | uniq > ./data/$1/2005-2.txt
cat ./data/$1/2006.txt | uniq > ./data/$1/2006-2.txt
cat ./data/$1/2007.txt | uniq > ./data/$1/2007-2.txt
cat ./data/$1/2008.txt | uniq > ./data/$1/2008-2.txt
cat ./data/$1/2009.txt | uniq > ./data/$1/2009-2.txt
cat ./data/$1/2010.txt | uniq > ./data/$1/2010-2.txt
cat ./data/$1/2011.txt | uniq > ./data/$1/2011-2.txt
cat ./data/$1/2012.txt | uniq > ./data/$1/2012-2.txt
cat ./data/$1/2013.txt | uniq > ./data/$1/2013-2.txt
cat ./data/$1/2014.txt | uniq > ./data/$1/2014-2.txt
cat ./data/$1/2015.txt | uniq > ./data/$1/2015-2.txt
