const express = require('express')
const db = require('./db/connect')

require('colors')
require('dotenv').config()
db.connect()
const config = process.env

const app = express()

app.listen(config.PORT, () => console.log(`server running at: http://127.0.0.1:${config.PORT}`.cyan.underline))