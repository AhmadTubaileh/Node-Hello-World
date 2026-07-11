require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const users = [
    {
        "id":1,
        "name":"Ahmad"
    },
    {
        "id":2,
        "name":"Sami"
    }
];

app.get("/",(req,res)=>{
    res.send("Home");
});

app.get("/about",(req,res)=>{
    res.end("about");
});

app.get("/users",(req,res)=>{
    res.send(users);
});

app.get("/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(u=>u.id === id);

    if(!user){
        res.status(404).json({
            "msg":"user not found"
        });
    }
    res.json(user);

});


app.post("/users",(req,res)=>{
    const newUser={
        id:users.length+1,
        name:req.body.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});







app.listen(process.env.PORT);