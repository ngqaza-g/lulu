const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const create_admin = require('./modules/create_admin');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use('/', require('./routes/router'));


const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false)
mongoose.connect(`${process.env.MONGODB_DEV}`, {useNewUrlParser: true})
.then(()=>{
    console.log("Connected to the database...");
    create_admin().then(()=>{
        app.listen(PORT, ()=> console.log(`SERVER STARTED ON PORT ${PORT} \nGo to http://localhost:${PORT}`))
    });
})
.catch(error=>{
    console.log("An error occured see below");
    console.error(error);
})