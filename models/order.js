const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    product:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity:  {
        type: Number,
        min: 1,
        required: true
    },
    price : {
        type: Number,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    reference : {
        type: String,
        required: true,
    },
});
const orderSchema = new Schema({
    customerName : {
        type: String,
        required: true,
    },
    orderNumber : {
        type: String,
        required: false,
    },
    email : {
        type: String,
        required: true,
    },
    adress : {
        type: String,
        required: true,
    },
    phone : {
        type: String,
        required: true,
    },
    message : {
        type: String,
        required: false,
    },
    products: [ productSchema ],
    total: {
        type: Number,
        required: true,
      },
    status: {
    type: Number,
    default: 1
    },

}, {
    timestamps: true
});

var Orders = mongoose.model('Order', orderSchema);

module.exports = Orders;