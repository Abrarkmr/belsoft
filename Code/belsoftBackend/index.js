const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const products = require('./routes/product');
const users = require('./routes/user');

app.use('/products' , products);
app.use('/user' , users);

const port = 2000;
const mongoUrl = "mongodb://localhost:27017/Belsoft";

app.get('/', function (req, res) {
    res.send('Hello World')
})

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err,connect)=>{
    if(err){
        console.log("Not connected to Db "+ err)
    }
    else{
        console.log("connected to DB")
    }
})
  
app.listen(port, ()=>{
    console.log("backend is working on port "+ port)
})