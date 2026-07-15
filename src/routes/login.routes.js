
const express = require("express");
const router = express.Router();
const users = require("../data/users");
const jwt = require("jsonwebtoken");


router.post("/",(req,res)=>{
    const {email,password} = req.body;
    

    if(email && password){
        const user = users.find(u=>u.email === email);
        if(!user){
            return res.status(404).json({
                "msg":"Could not find email"
            });
        }
        
        if(user.password !== password){
            return res.status(401).json({
                "msg":"Password is incorrect"
            });
        }

        const token =jwt.sign(
            {
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1m"
            }
        );

        res.json({
            "msg":"Logged in successfully",
            "token":token
        });



    }else{
        res.status(400).json({
            "msg":"email or password is missing"
        });
    }
});

module.exports = router;