const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    emailId : {
        type : String ,
        required : [true , "kindly enter your emailID"]
    } ,
    title : {
        type : "String" ,
        required : [true , "kindly enter the topic of the query"]
    } ,
    description : {
        type : String ,
        required : [true , "kindly enter the description of the query"]
    } ,
    date : {
        type : Date , 
        default : Date.now
    }
})

module.exports = mongoose.model('query' , querySchema)