const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path : './config/config.env'})

const connect = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("connected")
    })
}

module.exports = connect