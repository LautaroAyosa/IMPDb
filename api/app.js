const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const personsRouter = require('./routes/persons')
const moviesRouter = require('./routes/movies')
const loginRouter = require('./routes/login')
const usersRouter = require('./routes/users')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)
app.use('/api/movies', moviesRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

module.exports = app
