const express = require('express');
const app = express();
const router = express.Router();
var cors = require('cors');
app.use(cors());
const ProductTable = require('../models/product-model');
const cart = require('../models/cart-model');

router.post('/ss', (req,res)=>{
    res.send('Insideee')
})

router.post('/addProduct', (req,res)=>{
    const name = req.body.title;
    const imageUrl = req.body.imgUrl;
    const quantity = req.body.quantity;
    const desc = req.body.desc;
    const email = req.body.email;
    const price = req.body.price;
    const productId = Math.floor((Math.random() * 10999999) + (Math.random() * 99869990000077));
    const addProductRes = {};

    function checkFields(){
        return new Promise((resolve,reject)=>{
            if(name === " " || quantity === " " || imageUrl === " " || desc === " " || email === " " || price === " " || req.body === {}){
                console.log("1")
                reject("Please send all the fields")
            }else{
                resolve()
            }
        })
    }

    function addProd(){
        return new Promise((resolve,reject)=>{
            const product = new ProductTable({
                title: name,
                imageUrl: imageUrl,
                quantity: quantity,
                desc: desc,
                email: email,
                price: price,
                productId: productId,
                status: "active"
            })
            product.save()
            resolve()
        })
    }

    function sendResponse(){
        return new Promise((resolve,reject)=>{
            addProductRes.message  = "Product Successfully Added";
            addProductRes.status = "success";
            res.json(addProductRes);
            resolve();
        })
    }

    checkFields()
        .then(addProd)
        .then(sendResponse)
        .catch(err=>{
            res.json(err)
        })

    
})

router.post('/viewProducts', (req,res)=>{
    const email = req.body.email;
    const viewProductsRes = {};

    function getProducts(){
        return new Promise((resolve,reject)=>{
            ProductTable.find({status: "active",email: email},{__v: 0},(err,response)=>{
                if(response.length >=  1){
                    viewProductsRes.products = response;
                    resolve()
                }
                else{
                    reject("No products found for the user. Try adding the products.")
                }
                
            }) 
        })
    }

    function sendResponse(){
        return new Promise((resolve,reject)=>{
            viewProductsRes.message = "Products Fetched";
            viewProductsRes.status = "success";
            res.json(viewProductsRes);
            resolve();
        })
    }

    getProducts()
        .then(sendResponse)
        .catch(err=>{
            res.json(err)
        })
})

router.post('/addToCart', (req,res) =>{   
    const id = req.body.id;
    const email = req.body.email;
    const addToCartRes = {};

    function calcQuantity(){
        return new Promise((resolve,reject)=>{
            ProductTable.findOne({productId: id},{__v:0},(err,response)=>{
                if(response.quantity === 0){
                    reject("Product Not Available At The Moment");
                }
                else{
                    response.quantity = response.quantity - 1;
                    response.save();
                    const cartTab = new cart({
                        productId : id,
                        title : response.title,
                        email : response.email,
                        imageUrl : response.imageUrl,
                        price : response.price,
                        desc : response.desc,
                        tempId: Math.floor((Math.random() * 109767999) + (Math.random() * 9986921110000077))
                    })
                    cartTab.save();
                    addToCartRes.cart = response;
                    resolve();
                }
                
            })
        })
    }

    function getCartCount(){
        return new Promise((resolve,reject)=>{
            cart.find({email: email},{__v: 0},(err,response)=>{
                addToCartRes.count = response.length;
                resolve();   
                if(err){
                    reject(err)
                } 
            })
        })
    }

    function sendResponse(){
        return new Promise((resolve,reject)=>{
            addToCartRes.message = "Product Added To Cart";
            addToCartRes.status = "success";
            res.json(addToCartRes);
            resolve();
        })
    }

    calcQuantity()
        .then(getCartCount)
        .then(sendResponse)
        .catch(err=>{
            res.json(err)
        })
})

router.delete('/removeCart', (req,res) =>{
    const tempId = req.body.tempId;
    const id = req.body.id;
    const email = req.body.email;
    const removeCartRes = {};

    function calcQuantity(){
        return new Promise((resolve,reject)=>{
            cart.deleteOne({tempId: tempId}, (err,response)=>{
                if(err){
                    reject(err)
                }
                else{
                    ProductTable.findOne({productId: id},{__v:0},(err,response)=>{
                        response.quantity = response.quantity + 1;
                        response.save();
                        removeCartRes.cart = response;
                        resolve();
                })
                }
            })
           
        })
    }

    function getCartCount(){
        return new Promise((resolve,reject)=>{
            cart.find({email: email},{__v: 0},(err,response)=>{
                removeCartRes.count = response.length;
                resolve();   
                if(err){
                    reject(err)
                } 
            })
        })
    }

    function sendResponse(){
        return new Promise((resolve,reject)=>{
            removeCartRes.message = "Product Removed From Cart";
            removeCartRes.status = "success";
            res.json(removeCartRes);
            resolve();
        })
    }

    calcQuantity()
        .then(getCartCount)
        .then(sendResponse)
        .catch(err=>{
            res.json(err)
        })
})

router.post('/fetchCart',(req,res) =>{
    const email = req.body.email;
    const fetchCartRes = {};

    function getProducts(){
        return new Promise((resolve,reject)=>{
            cart.find({email: email},{__v: 0},(err,response)=>{
                fetchCartRes.count = response.length;
                if(response.length > 0){
                    fetchCartRes.products = response;
                    resolve()
                }
                else{
                    reject({"message":"No products in the cart","count":fetchCartRes.count})
                }
                
            })
        })
    }

    function sendResponse(){
        return new Promise((resolve,reject)=>{
            fetchCartRes.message = "Cart Loaded";
            fetchCartRes.status = "success";
            res.json(fetchCartRes);
            resolve();
        })
    }

    getProducts()
        .then(sendResponse)
        .catch(err=>{
            res.json(err)
        })
})

module.exports = router;