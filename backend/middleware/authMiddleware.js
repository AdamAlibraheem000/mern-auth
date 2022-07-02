const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//function to protect routes
const protect = asyncHandler(async (req, res, next) => {
    let token

    // Check for token in headers
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1] //Turns into an array where Bearer is first item & token is second
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user id from token
            req.user = await User.findById(decoded.id).select('-password') //excludes password

            next() //call next piece of middleware
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    // Check if no token
    if(!token){
        res.status(401)
        throw new Error('Not authorized')
    }
})

module.exports = { protect }