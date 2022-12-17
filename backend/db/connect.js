const mongoose = require('mongoose')

exports.connect = async ()=>{
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected successfully: ${conn.connection.host}`.green.underline)
    } catch (error) {
        console.log(`Database connection failed with error: ${error}`.red)
        process.exit(1)
    }
}

