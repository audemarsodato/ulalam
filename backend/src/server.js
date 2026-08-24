require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()
const v1Routes = require('./v1/routes/index')
const handle404 = require('./middlewares/404Handler')

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1', v1Routes)

app.use(handle404)

mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
                console.log('Connected to db')
                app.listen(process.env.PORT, () => {
                        console.log(`Listening on port ${process.env.PORT}`)
                })
        })
        .catch(error => {
                console.log(error)
        })