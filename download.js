var https = require('https');
var fs = require('fs');
var _ = require('lodash');
var i = 0;
var requestOptions;
var request;
var startDate = new Date(process.argv[3]);
var endDate = new Date(process.argv[4]);
var ticks = [];
var count = 0;

function pad(value) {
    if (value < 10) {
        return '0' + value;
    }
    else {
        return value;
    }
}

function download() {
    requestOptions = {
        host: 'api-fxtrade.oanda.com',
        path: '/v1/candles?instrument=' + process.argv[2] + '&granularity=M1&start=' + startDate.getFullYear() + '-' + pad(startDate.getMonth() + 1) + '-' + pad(startDate.getDate()) + 'T00%3A00%3A00Z&end=' + endDate.getFullYear() + '-' + pad(endDate.getMonth() + 1) + '-' + pad(endDate.getDate()) + 'T23%3A59%3A59Z&candleFormat=midpoint',
        method: 'GET'
    };
    request = https.request(requestOptions, function(response) {
        var data = '';

        response.on('data', function(chunk) {
            data += chunk.toString();
        });
        response.on('end', function(chunk) {
            var parsedData = JSON.parse(data);

            parsedData.candles.forEach(function(tick) {
                tick.timestamp = new Date(tick.time);
                ticks.push(tick);
            });

            count++;
            console.log(count + ' / 365');

            startDate.setDate(startDate.getDate() + 1);
            endDate.setDate(endDate.getDate() + 1);

            if (count <= 356) {
                setTimeout(function() {
                    download();
                }, 500)
            }
            else {
                ticks = _.uniq(ticks);
                ticks = _.sortBy(ticks, 'timestamp');

                ticks.forEach(function(tick) {
                    fs.appendFileSync(process.argv[5], tick.time + ',' + tick.openMid + ',' + tick.highMid + ',' + tick.lowMid + ',' + tick.closeMid + '\n');
                });
            }
        });
    });
    request.end();
}

download();
