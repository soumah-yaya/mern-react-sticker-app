const express = require('express')
const { expressjwt } = require('express-jwt')
const db = require('./db/connect')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')

const users = require('./routes/usersRoute')
const stickers = require('./routes/stickersRoute')

require('colors')
require('dotenv').config()
const config = process.env

db.connect()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

    // verify token
app.use(expressjwt({
    secret: config.SECRET_KEY,
    algorithms: ['HS256'],
}).unless({ path: ["/api/users", "/api/users/login"] }))

app.use('/api/users', users)
app.use('/api/stickers', stickers)

app.use(errorHandler)

app.listen(config.PORT, () => console.log(`server running at: http://127.0.0.1:${config.PORT}`.cyan.underline))