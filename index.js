const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task');

//express app
const app = express();

//connect to mongo
const URI = 'mongodb+srv://maria483:BAWZIMXopy8ZP1Yh@tododata.vk69vdb.mongodb.net/task-data?retryWrites=true&w=majority';
mongoose.connect(URI)
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err));

//
require('dotenv').config();

//
app.use(express.urlencoded({extended: true}));

//register view engine
app.set("view engine","ejs");

//mongo routes
app.post('/add-task',(req,res)=>{
    req.body
    const task = new Task({
        title:req.body.title,
        completed: false,
        date:req.body.date,
        description:req.body.description
    });

    task.save()
    .then((result)=>{
        res.redirect('/');
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.put("/:id",(req,res)=>{
    console.log("before");

    const filter = {_id: req.body.task._id};
    const update ={
        $set:{
            completed:true
        },
    };
    const options = {upsert:true, new:true};
    console.log("during");
    
    Task.findOneAndUpdate(filter,update,options)
    .then((result)=>{
        res.json({
            matchedCount:result?1:0,
            modifiedCount: result?1:0,
        });
        res.json({redirect:'/'})
        console.log("after");
    })
    .catch((err)=>{
        console.log(err);
    });
});

//routes
app.get('/',(req, res) => {
    Task.find()
    .then((result)=>{
        res.render('home',{tasklist: result});
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/editor',(req, res) => {
    Task.find()
    .then((result)=>{
        res.render('editor',{tasklist: result});
    })
    .catch((err)=>{
        console.log(err);
    });
});
