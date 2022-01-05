const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : [true , "please enter your name"]
    } ,
    emailID : {
        type : String ,
        required : [true , "please enter your email ID"]
    } ,
    password : {
        type : String ,
        required : [true , "please enter your password"] ,
        minLength : [5 , "minimum length of the password is 5"]
    }
})

module.exports = mongoose.model('user' , userSchema)