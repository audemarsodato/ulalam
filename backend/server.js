require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()
const v1Routes = require('./v1/routes/index')

app.use(morgan('dev'))

app.use('/api/v1', v1Routes)

app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT)
})