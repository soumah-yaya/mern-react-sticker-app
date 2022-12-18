const errorHandler = (err, req, res, next) => {

    if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            data: null,
            meta: {
                status: 401,
                msg: 'unauthorized access'
            }

        })
    }
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        data: null,
        meta: {
            status: statusCode,
            msg: err.message
        },       
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}