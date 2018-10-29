require('dotenv').config()
const createError = require('http-errors'),
     express = require('express'),
     path = require('path'),
     cors = require('cors'),
     app = express()

const indexRouter = require('./routes/index'),
     usersRouter = require('./routes/users'),
     videosRouter = require('./routes/videos')

const mongoose   = require('mongoose'),
     urltest = `mongodb://localhost:27017/livecode29oktober`

mongoose.connect(urltest,{ useNewUrlParser: true })
    
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('We are connected')
})

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors())

app
  .use('/', indexRouter)
  .use('/users', usersRouter)
  .use('/videos', videosRouter)

app.use(function(req, res, next) {
  next(createError(404))
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
