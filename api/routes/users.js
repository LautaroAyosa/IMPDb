const usersRouter = require('express').Router()
const usersController = require('../controllers/users') 

usersRouter.get('/', usersController.getUsers)
usersRouter.get('/:id', usersController.getOneUser)

usersRouter.post('/', usersController.createUser)

module.exports = usersRouter