require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const toDo = [
    {
        "id":1,
        "task":"get a job"
    },
    {
        "id":2,
        "taskName":"train for full stack"
    }
];

app.get("/",(req,res)=>{
    res.send("Home");
});

app.get("/about",(req,res)=>{
    res.end("about");
});

app.get("/toDo",(req,res)=>{
    res.send(toDo);
});

app.get("/toDo/:id",(req,res)=>{
    const id = Number(req.params.id);
    const task = toDo.find(task=>task.id === id);

    if(!task){
        res.status(404).json({
            "msg":"task not found."
        });
    }
    res.json(task);

});


app.post("/toDo",(req,res)=>{
    const newTask={
        id:toDo.length+1,
        taskName:req.body.task
    };

    toDo.push(newTask);
    res.status(201).json(newTask);
});

app.patch("/toDo/:id",(req,res)=>{
    const id = Number(req.params.id);
    const taskName = req.body.task;

    const task = toDo.find(task => task.id === id);
    if (!task) {
        return res.status(404).json({
            "msg": "task not found"
        });
    }

    if(taskName){
        task.taskName = taskName;
    }

    res.json(task);
});


app.delete("/toDo/:id",(req,res)=>{
    const id = Number(req.params.id);
    const index = toDo.findIndex(task=>task.id===id);

    if (index===-1) {
        return res.status(404).json({
            msg: "task not found"
        });
    }
    toDo.splice(index,1);
    res.json({
        "msg": "Deleted successfully"
    });
});




app.listen(process.env.PORT);