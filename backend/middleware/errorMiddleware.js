const errorHandler = (err,req,res,next)=>{
       
    if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError'){
       return res.status(401).json({
        
        message:'access denied--invalid token'
       })
    }
    const statusCode = res.statusCode? res.statusCode: 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production'? null: err.stack
    })
}

module.exports = {
    errorHandler
}