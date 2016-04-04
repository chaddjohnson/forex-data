#!/bin/bash

# echo "2005"; node download.js "AUD_JPY" "2005-01-01T00:00:00Z" "2005-01-01T23:59:59Z" ./data/2005.txt
# echo "2006"; node download.js "AUD_JPY" "2006-01-01T00:00:00Z" "2006-01-01T23:59:59Z" ./data/2006.txt
# echo "2007"; node download.js "AUD_JPY" "2007-01-01T00:00:00Z" "2007-01-01T23:59:59Z" ./data/2007.txt
# echo "2008"; node download.js "AUD_JPY" "2008-01-01T00:00:00Z" "2008-01-01T23:59:59Z" ./data/2008.txt
# echo "2009"; node download.js "AUD_JPY" "2009-01-01T00:00:00Z" "2009-01-01T23:59:59Z" ./data/2009.txt
echo "2010"; node download.js "AUD_JPY" "2010-01-03T00:00:00Z" "2010-01-03T23:59:59Z" ./data/2010.txt
# echo "2011"; node download.js "AUD_JPY" "2011-01-01T00:00:00Z" "2011-01-01T23:59:59Z" ./data/2011.txt
# echo "2012"; node download.js "AUD_JPY" "2012-01-01T00:00:00Z" "2012-01-01T23:59:59Z" ./data/2012.txt
# echo "2013"; node download.js "AUD_JPY" "2013-01-01T00:00:00Z" "2013-01-01T23:59:59Z" ./data/2013.txt
# echo "2014"; node download.js "AUD_JPY" "2014-01-01T00:00:00Z" "2014-01-01T23:59:59Z" ./data/2014.txt
# echo "2015"; node download.js "AUD_JPY" "2015-01-01T00:00:00Z" "2015-01-01T23:59:59Z" ./data/2015.txt

# cat ./data/2005.txt | uniq > ./data/2005-2.txt
# cat ./data/2006.txt | uniq > ./data/2006-2.txt
# cat ./data/2007.txt | uniq > ./data/2007-2.txt
# cat ./data/2008.txt | uniq > ./data/2008-2.txt
# cat ./data/2009.txt | uniq > ./data/2009-2.txt
cat ./data/2010.txt | uniq > ./data/2010-2.txt
# cat ./data/2011.txt | uniq > ./data/2011-2.txt
# cat ./data/2012.txt | uniq > ./data/2012-2.txt
# cat ./data/2013.txt | uniq > ./data/2013-2.txt
# cat ./data/2014.txt | uniq > ./data/2014-2.txt
# cat ./data/2015.txt | uniq > ./data/2015-2.txt
