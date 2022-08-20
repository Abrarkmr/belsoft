const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    productId: Number,
    title: String,
    email: String,
    imageUrl: String,
    quantity: Number,
    price: Number,
    desc: String,
    status: String
});

const ProdModel = mongoose.model('product', Products);
module.exports = ProdModel;