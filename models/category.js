const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name : {
        type: String,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    subCategories:[String],

}, {
    timestamps: true
});

var Categories = mongoose.model('Category', categorySchema);

module.exports = Categories;