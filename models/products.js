const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        default: '#31A8FF'
    },
    category: {
        type: String,
        required: true
    },
    tags:[String],
    inStock: {
        type: Boolean,
        default: true
    },
    inBasket: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;