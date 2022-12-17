const express = require('express')

require('colors')
require('dotenv').config()

const config = process.env

const app = express()

app.listen(config.PORT, () => console.log(`server running at: http://127.0.0.1:${config.PORT}`.cyan.underline))