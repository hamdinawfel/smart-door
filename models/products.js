const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: false
    },
    dimensions: {
        type: String,
        required: false
    },
    material: {
        type: String,
        required: false
    },
    deliveryMode: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
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
    quantity: {
        type: Number,
        default: 0
    },
    showcase: {
        type: Boolean,
        default: false, // for redering product on the landing page 
    }
}, {
    timestamps: true
});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;