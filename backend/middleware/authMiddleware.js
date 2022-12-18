const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../services/userService');


const protect = asyncHandler(async(req,res,next)=>{
    let token = req.headers.authorization?.split(' ')[1]
   
    // verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    // make current user id available to all protected routes    
    let {id} = await User.getUserById(decoded.id)
    req.id=id
   
    next()
})

module.exports = {protect};