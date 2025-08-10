const express = require('express')
const app = express();
const qs = require("qs");
const env = require("dotenv");

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))


const PORT = 3000;
app.listen(PORT, () => {
    console.log("server running on " + PORT);
})