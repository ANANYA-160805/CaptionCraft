// api ke andar authentication se related logic yahan likhenge
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerController(req, res) {
       // Implementation for user registration
        const {username , password} = req.body;
    
        const existingUser = await userModel.findOne({
            username
        })
    
        if(existingUser){
            return res.status(409).json({
                message:"username already exists"
            })
        }
    
        const user = await userModel.create({
            username,
            password: await bcrypt.hash(password, 10)
        })
    
        const token = jwt.sign({
            userId: user._id,
    
        }, process.env.JWT_SECRET)
    
        res.cookie("token", token)
    
        res.status(201).json({
            message:"user registered successfully",
            user
        })
}

async function loginController(req, res) {
    // Implementation for user login
    const {username , password} = req.body;

    const user = await userModel.findOne({
        username
    })

    if(!user){
        return res.satus(400).json({
            message:"invalid credentials"
        })
    }

    const isPasswordValid= await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message:"user logged in successfully",
        user
    })
    
}

module.exports = {
    registerController,
    loginController
}