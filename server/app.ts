import express from 'express'
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const profileRoutes = require('./api/routes/profile')
const userRoutes = require('./api/routes/user')
const vaccineRoutes = require('./api/routes/vaccine')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
    return res.status(200).json({})
  }
  next()
})

app.use('/api/user', userRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/vaccine', vaccineRoutes)

app.use((req, res, next) => {
  const error: any = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error: any, res) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

module.exports = app
