//.env dosyasındaki değişkenleri kullanabilmek için
require("dotenv").config();
//express uygulaması yaratımı
const express = require('express')
const app = express();

//mongoose kullanmak için
const mongoose = require("mongoose")
//
const qs = require("qs");
//todo dosyasını kullanmak için yaratılan değişken
const Todo = require("./models/ToDo")
//dosya yolunu uygulamaya tanıtmak için 
const path = require("path")
app.use(express.static(path.join(__dirname,"public")));
//verileri okuyabilmek için 
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
//cors ayarlarını kullanamk için 
const cors = require('cors')


//mongodb ile bağlantı kurulması için
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("mongoDB connected"))
    .catch(err => console.error("mongoDB not connected:", err));

//task eklemek için kullanılacak istek
app.post("/api/todo",async (req,res) => {
    const {title,description, completed, createdAt} = req.body
    await Todo.addNote(title,description, completed, createdAt)

    const todos = await Todo.find()
    res.status(201).json(todos)
})

//task düzenlemek için kullanılacak endpoint
app.put("/api/todo",async(req,res) => {
    console.log(req.body)
    await Todo.findByIdAndUpdate(req.body.id,{title: req.body.title})
    res.sendStatus(201)
}) 

//task silmek için kullanılacak istek
app.delete("/api/todo", async(req,res) => {
    try {
        const response = await Todo.deleteOne({_id: req.body.id})
        console.log(response)
        res.status(201).json(response)
    } catch (error) {
        console.error("delete isteğinde sorun", error)
    }
})
//taskların dbden çekilip döndürüldüğü url
app.get("/api/todo", async(req,res) => {
    const todo = await Todo.find()
    res.json(todo)
})

//taskların clienta sunulduğu sayfa
app.get("/pages/todo.html", async(req,res) => {
    res.sendFile(path.join(__dirname,"public","pages","todo.html"))
})

//sadece bir taskın gösterileceği ekran
app.get("/pages/todo/:id",async(req,res)=> {
    res.sendFile(path.join(__dirname,"public","pages","todo.html"))
})

//sadece bir task alınması gereken api konumu
app.get("/api/todo/:id", async(req,res) => {
    res.json(await Todo.findById(req.params.id))
})

//bağlanılacak portun seçimi
const PORT = 3000;
app.listen(PORT, () => {
    console.log("server running on " + PORT);
})