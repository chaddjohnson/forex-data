var config = require('./config.json');
var https = require('https');
var colors = require('colors');
var mongoose = require('mongoose');
var Tick = require('./models/Tick');

var reconnectDelay = 1000;

mongoose.connect('mongodb://localhost/forex-data');
mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));

function stream() {
    var requestOptions = {
        host: config.host,
        path: '/v1/prices?accountId=5280798&instruments=' + config.instruments.join('%2C'),
        method: 'GET',
        headers: {'Authorization' : 'Bearer ' + config.accessToken},
    };
    var request = https.request(requestOptions, function(response) {
        var noDataTimeout = 0;
        var bodyChunk = '';
        var data = null;

        console.log('Connected at ' + new Date());

        // Reset reconnection delay.
        reconnectDelay = 1000;

        response.on('data', function(chunk) {
            clearTimeout(noDataTimeout);    
            noDataTimeout = setTimeout(function() {
                console.log('No data received for 10 seconds; aborting'.red);
                request.abort();
            }, 10 * 1000);

            try {
                bodyChunk = chunk.toString().trim();

                if (!bodyChunk) {
                    // No data.
                    return;
                }

                if (bodyChunk.indexOf('\n') > -1) {
                    // Multiple ticks found.
                    bodyChunk = bodyChunk.replace(/\n/g, ',');
                }

                // Use an array.
                bodyChunk = '[' + bodyChunk + ']';

                // Parse the data.
                data = JSON.parse(bodyChunk);

                data.forEach(function(item) {
                    var tick = item.tick;
                    var documentData = null;

                    if (tick) {
                        documentData = {
                            symbol: tick.instrument.replace('_', ''),
                            bid: tick.bid,
                            ask: tick.ask,
                            timestamp: new Date(tick.time)
                        };
                        Tick.create(documentData);
                    }
                });
            }
            catch (error) {
                console.error(error.toString().red);
            }
        });
        response.on('end', function(chunk) {
            clearTimeout(noDataTimeout);    

            console.log('Disconnected at ' + new Date() + ': ' + response.statusCode);
            console.log();

            setTimeout(function() {
                // Restart streaming.
                stream();
            }, reconnectDelay);

            // Double reconnection delay timeout, per documentation.
            reconnectDelay *= 2;
        });
    });
    request.on('error', function(error) {
        console.log(error.toString().red);

        if (error.code !== 'ENOTFOUND') {
            // Error is something other than no Internet connection.
            // Double reconnection delay timeout, per documentation.
            reconnectDelay *= 2;
        }

        setTimeout(function() {
            // Restart streaming.
            stream();
        }, reconnectDelay);
    });
    request.end();
}

stream();
