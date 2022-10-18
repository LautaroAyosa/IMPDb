const moviesRouter = require('express').Router()
const moviesController = require('../controllers/movies') 

moviesRouter.get('/', moviesController.getMovies)
moviesRouter.get('/:id', moviesController.getOneMovie)
moviesRouter.post('/', moviesController.createMovie)
moviesRouter.delete('/:id', moviesController.deleteMovie)
moviesRouter.put('/:id', moviesController.updateMovie)

moviesRouter.patch('/:id/addActor', moviesController.addActor)
moviesRouter.patch('/:id/addDirector', moviesController.addDirector)
moviesRouter.patch('/:id/addProducer', moviesController.addProducer)

module.exports = moviesRouter