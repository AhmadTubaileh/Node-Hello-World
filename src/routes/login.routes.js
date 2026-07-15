
const express = require("express");
const router = express.Router();
const users = require("../data/users");
const jwt = require("jsonwebtoken");


router.post("/",(req,res)=>{
    const {username,password} = req.body;

    if(username && password){
        const user = users.find(u=>u.username === username);
        if(!user){
            return res.status(404).json({
                "msg":"Could not find username"
            });
        }
        
        if(user.password !== password){
            return res.status(401).json({
                "msg":"Password is incorrect"
            });
        }

        const token =jwt.sign(
            {
                username:user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"15s"
            }
        );

        res.json({
            "msg":"Logged in successfully",
            "token":token
        });



    }else{
        res.status(400).json({
            "msg":"username or password is missing"
        });
    }
});

module.exports = router;