var mongoose = require('mongoose');

var tickSchema = mongoose.Schema({
    symbol: {type: String, required: true},
    bid: {type: Number, required: true},
    ask: {type: Number, required: true},
    timestamp: {type: Date, required: true},
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.connection.model('Tick', tickSchema);
