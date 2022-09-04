const express = require('express');
const app = express();
const router = express.Router();

const user = require('../models/user-model');


router.post('/addMyUser', function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var mailCheck = [];
    var respObj = {};
   

    var myId =  new Date();
    myId.getMilliseconds();

    function fetchEmails(){
        return new Promise((resolve,reject) =>{
            user.find({status:"active"}, function(err,ress){
                if(err){
                    reject("Error in Checking DB")
                }
                else{
                    ress.map(x=>{
                        mailCheck.push(x.email)
                    })
                    resolve()
                }
            })
        })
    }

    function matchEmail(){
        return new Promise((resolve,reject) => {
            if(mailCheck.includes(email)){
                reject("Email already exists. Use a new email id.")
            }
            else{
                resolve()
            }
        })
    }

    function addEmail(){
        return new Promise((resolve,reject) =>{
            const newUser = new user({
                userId: myId,
                name: name,
                email: email,
                password: password,
                status: "active"
            })
            newUser.save()
            resolve()
        })
    }

    function sendResponse(){
        return new Promise((resolve,reject)=>{
            respObj.message = "User successfully added";
            respObj.status = "success";
            res.json(respObj);
            resolve();
        })
    }

    fetchEmails()
        .then(matchEmail)
        .then(addEmail)
        .then(sendResponse)
        .catch(err =>{
            console.log(err)
            respObj.message = err;
            res.json(respObj)
        })

})

router.post('/validateUser', function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var userResp = {};

    function getEmailAndValidate(){
        return new Promise((resolve,reject)=>{
            user.findOne({email: email}, function(err,ress){
                if(err){
                    resolve("DB Connection Error")
                }
                else{
                    if(ress == undefined || ress == "unndefined" || ress == null || ress == "null" || ress.length < 1){
                        reject("Invalid Credentials")
                    }
                    else{
                        if(ress.password == password){
                            resolve()
                        }
                        else{
                            reject("Invalid Authentication")
                        }
                    }
                }
            })
        })
    }

    function sendResponse(){
        return new Promise((resolve,reject)=>{
            userResp.status = "success";
            userResp.email = email;
            userResp.message = "User Authenticated";
            res.json(userResp);
            resolve();
        })
    }

    getEmailAndValidate()
        .then(sendResponse)
        .catch(err=>{
            res.send(err)
        })
   
})


module.exports = router;