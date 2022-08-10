const connectToMongo = require('./db');
const express = require("express");
var cors = require('cors');
require('dotenv').config
const app = express();

const port = process.env.PORT;
connectToMongo(); //just printing wether connected to database or not

app.use(cors());
app.use(express.json()); //middleware. compulsory

//Available Routes //if we go on /api/auth this point then we will get the info which providing in ./routes/auth.js location
// same for notes part
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));


app.get("/",(req , res)=>{
    res.send("Hello to main page");
})




app.listen(process.env.PORT || 5000,()=>{
    console.log("Listeninig to 5000 port......");
})

