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
        response.on('error', function(chunk) {
            process.stdout.write('...ERROR\n');
        });
        response.on('end', function(chunk) {
            try {
                var parsedData = JSON.parse(data);

                parsedData.candles.forEach(function(tick) {
                    tick.timestamp = new Date(tick.time);
                    ticks.push(tick);
                });
            }
            catch (error) {}

            count++;
            process.stdout.cursorTo(32);
            process.stdout.write(count + ' / 356');

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
                    fs.appendFileSync(process.argv[5], tick.timestamp.getTime() + ',' + tick.openMid + ',' + tick.highMid + ',' + tick.lowMid + ',' + tick.closeMid + '\n');
                });

                process.stdout.write('...saved\n');
            }
        });
    });
    request.end();
}

download();
