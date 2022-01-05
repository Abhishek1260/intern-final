const mongoose = require('mongoose');
const express = require('express');
const user = require('../models/Users')
const bcrypt = require('bcryptjs')
// const dotenv = require('dotenv')
const JWT = require('jsonwebtoken')

// dotenv.config({path : "../config/config.env"})
const router = express.Router();

//endpoint to make a user

router.post('/signup' , async (req , res) => {

    const existUser = await user.findOne({emailID : req.body.emailid})

    if (existUser) {
        return res.status(401).json({success : false , message : 'User already exists'})
    }

    const password = req.body.password

    const salt  = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password , salt)

    const newUser = {
        name : req.body.name ,
        emailID : req.body.emailid ,
        password : newPassword
    }

    const users = await user.create(newUser);

    const token = JWT.sign({id : users._id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXP})

    return res.status(201).json({success : true , token})
    
})

//endpoint to make a user login

router.post('/login' , async (req , res) => {

    const emailID = req.body.emailid
    const password = req.body.password

    const users = await user.findOne({emailID})

    if (!users) {
        return res.status(401).json({success : false , message : "no registeration via this email"})
    }

    const compare = await bcrypt.compare(password , users.password)

    if (!compare) {
        return res.status(401).json({success : false , message : "credentials mismatch"})
    }

    const token = JWT.sign({id : users._id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXP})

    const options = {
        expires : new Date(Date.now() + process.env.JWT_EXP * 24 * 60 * 60 * 1000) ,
        httpOnly : true
    }

    return res.status(201).cookie('token' , token , options).json({success : true , token})

})

//endpoint to get the details for a particular user 
router.post('/getdet/:token' , async (req , res) => {
    const id = JWT.decode(req.params.token , process.env.JWT_SECRET);

    const users = await user.findById(id.id)

    return res.status(200).json({success : true , users})
})

module.exports = router;