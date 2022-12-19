const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../services/userService');


const protect = asyncHandler(async(req,res,next)=>{
    
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            // verify the token
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // create user property in req and get user from the token and store it in it
            // all protected route can access this user property
            let { id } = await User.getUserById(decoded.id)
            req.id = id

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
})

module.exports = {protect};