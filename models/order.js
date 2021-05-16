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
    purchasePrice : {
        type: Number,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
});
const orderSchema = new Schema({
    user:  { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    customerName : {
        type: String,
        required: true,
    },
    city : {
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