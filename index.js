const express=require('express');
const app=express();
const database=require('./config/database.js')
database.connect()
require('dotenv').config();
const port=process.env.PORT;

const route=require("./routes/client/index-route.js")

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static("public"));
route(app)

app.listen(port, ()=>{
    console.log(`Welcome port ${port}`);
})