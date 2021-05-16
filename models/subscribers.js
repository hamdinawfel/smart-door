const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
    email : {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

var Subscribers = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscribers;