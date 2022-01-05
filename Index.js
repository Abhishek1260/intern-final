const express = require('express')
const dotenv = require('dotenv')
const connect = require('./DB')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app = express()
var corsOptions = {
    origin: 'http://project5-intern.herokuapp.com/',
    credentials:  true
}
app.use(cors(corsOptions))
dotenv.config({path : './config/config.env'})
app.use(express.json())
connect()
app.use(cookieParser())

app.use('/api/v1', require('./routes/UserRoutes'))
app.use('/api/v2', require('./routes/QueryRoutes'))

app.use(express.static('./client/build'))

app.get("*" , (req , res) => {
    res.sendFile(path.resolve("./client/build/index.html"))
})


app.listen(process.env.PORT , (req , res) => {
    console.log(`the server is running at the port ${process.env.PORT}`)
})

