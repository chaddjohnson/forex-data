var config = require('./config.json');
var https = require('https');
var colors = require('colors');
var mongoose = require('mongoose');
var OANDAAdapter = require('oanda-adapter');
var Tick = require('./models/Tick');

var client = new OANDAAdapter({
    environment: 'live',
    accessToken: config.accessToken
});

console.log('Starting client');

mongoose.connect('mongodb://localhost/forex-data');
mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));

config.instruments.forEach(function(symbol) {
    client.subscribePrice(config.accountId, symbol, function(tick) {
        Tick.create({
            symbol: tick.instrument.replace('_', ''),
            bid: tick.bid,
            mid: (tick.bid + tick.ask) / 2,
            ask: tick.ask,
            timestamp: tick.time
        }, function(error) {
            if (error) {
                console.error(error.toString().red);
            }
        });
    }, this);
});