const mongoose = require('mongoose')
require('dotenv').config()

module.exports.connect = () => {
    mongoose.connect(process.env.MONGODB).then(()=>console.log('Connected to MongoDB!')).catch(()=>console.log('Failed to connect database!'))
}
