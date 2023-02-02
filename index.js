require('dotenv').config()
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT
const MONGO = process.env.MONGO

const app = express()

require('./mongo').connect(MONGO)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/api', require('./routes'))

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`)
})