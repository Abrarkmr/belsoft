const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    productId: Number,
    title: String,
    email: String,
    imageUrl: String,
    price: Number,
    desc: String,
    tempId: Number,
    status: String
});

const CartModel = mongoose.model('cart', Cart);
module.exports = CartModel;