const mongoose = require('mongoose')
require('dotenv').config()
const connection={};
module.exports.connect = async () => {
    try{
        if (connection.isConnected) return;
        const db= await mongoose.connect(process.env.MONGODB).then(()=>console.log('Connected to MongoDB!')).catch(()=>console.log('Failed to connect database!'));
    }
    catch(error){
        console.log(error)
        throw new Error(error);
    }
    
}
