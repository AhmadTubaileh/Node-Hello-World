
const express = require("express");
const router = express.Router();

const users = require("../data/users");

router.get("/",(req,res)=>{
    res.send(users);
});

router.get("/:username",(req,res)=>{
    const username = req.params.username;
    const user = users.find(user=>user.username === username);

    if(!user){
        res.status(404).json({
            "msg":"user not found"
        });
    }
    res.json(user);
});

router.post("/",(req,res)=>{
    const {username,password} = req.body;

    if(username && password){
        const newUser = {
            "username": username,
            "password": password
        };
        users.push(newUser);
        res.status(201).json(newUser);

    }else{
        res.status(400).json({
            "msg":"username or password is missing"
        });
    }
});

router.patch("/:username",(req,res)=>{
    const username = req.params.username;
    const user = users.find(user=>user.username === username);

    if(!user){
    res.status(404).json({
        "msg":"user not found"
    });
    }

    if(req.body.username){
        user.username = req.body.username;
        res.json({
            "New username": user.username
        });
    }else{
         res.status(400).json({
            "msg":"username or password is missing"
        });
    }
    
});

router.delete("/:username",(req,res)=>{
    const username = req.params.username;
    const index = users.findIndex(user=>user.username === username);

    if (index===-1) {
        return res.status(404).json({
            "msg": "username not found"
        });
    }
    users.splice(index,1);
    res.json({
        "msg": "Deleted successfully"
    });
});

module.exports = router;