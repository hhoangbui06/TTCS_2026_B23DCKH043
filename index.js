const express=require('express');
const app=express();

const methodOverride=require('method-override')
app.use(methodOverride('_method'))

const cookieParser=require('cookie-parser')
const session=require('express-session')
const flash=require('express-flash');
app.use(cookieParser('hhoangbui'));
app.use(session({cookie:{maxAge:60000}}));
app.use(flash())


const database=require('./config/database.js')
database.connect()
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
require('dotenv').config();
const port=process.env.PORT;

const routeClient=require("./routes/client/index-route.js")
const routeAdmin=require('./routes/admin/index-route.js')

const systemConfig=require('./config/system.js');
app.locals.prefixAdmin=systemConfig.prefixAdmin;
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static("public"));
routeClient(app)
routeAdmin(app)

app.listen(port, ()=>{
    console.log(`Welcome port ${port}`);
})