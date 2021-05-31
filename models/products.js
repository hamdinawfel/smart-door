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
    category: {
        type: String,
        required: true
    },
    tags:[String],
    stock: {
        type: Number,
        required: true,
    },
    alertStock: {
        type: Number,
        required: true,
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