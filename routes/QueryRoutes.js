const express = require('express')
const query = require('../models/Query')
const user = require('../models/Users')
const JWT = require('jsonwebtoken')
// const dotenv = require('dotenv')

// dotenv.config({path : "../config/config.env"})
const router = express.Router()

//endpoint to get all the query
router.get('/getall' , async (req , res) => {

    const queries = await query.find()

    return res.status(201).json({success : true , queries})

})

//endpoint to create query
router.post('/post/:token' , async (req , res) => {

    const token = req.params.token

    if (token === 'undefined') {
        const users = await user.findOne({emailID : req.body.emailID})
        if (users) {
            return res.status(201).json({success : false , message : "not authorized to send"})
        }
        const queries = await query.create({
            emailId : req.body.emailID ,
            title : req.body.title ,
            description : req.body.description
        })
        return res.status(201).json({success : true , message : "query registered" , queries})
    }

    const id = JWT.decode(token , process.env.JWT_SECRET)

    const users = await user.findById(id.id)

    const queries = await query.create({
        emailId : users.emailID ,
        title : req.body.title ,
        description : req.body.description
    })

    return res.status(201).json({success : true , message : "query registered" , queries})

})

//to distinguish the queries of a particular person 

router.get('/getall/:token' , async (req , res) => {
    const token = req.params.token
    if (token === "undefined") {
        return res.status(401).json({message : false , message : "not authorized kindly login again or create account"})
    }
    const id = JWT.decode(token , process.env.JWT_SECRET)
    const users = await user.findById(id.id)
    const queries = await query.find({emailId : users.emailID})
    return res.status(201).json({success : true , queries , users})
})

module.exports = router