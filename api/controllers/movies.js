const { Movie } = require('../models/Movie')
const { Person } = require('../models/Person')

const getMovies = async (req, res) => {
    const movies = await Movie.findAll({
        include: [
            {
                model: Person, 
                as: 'Cast',
                attributes: { exclude: ['id', 'createdAt', 'updatedAt']}
            },
            {
                model: Person, 
                as: 'Directors',
                attributes: { exclude: ['id', 'createdAt', 'updatedAt']}
            },
            {
                model: Person, 
                as: 'Producers',
                attributes: { exclude: ['id', 'createdAt', 'updatedAt']}
            }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })

    res.status(200).json(movies)
}

const getOneMovie = async (req, res) => {
    const id = req.params.id
    const movie = await Movie.findOne({
        where: {id},
        include: [
            {
                model: Person, 
                as: 'Cast',
                attributes: { exclude: ['id', 'createdAt', 'updatedAt']}
            },
            {
                model: Person, 
                as: 'Directors',
                attributes: { exclude: ['id', 'createdAt', 'updatedAt']}
            },
            {
                model: Person, 
                as: 'Producers',
                attributes: { exclude: ['id', 'createdAt', 'updatedAt']}
            }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })

    res.status(200).json(movie)
}

const createMovie = async (req, res) => {

    try {
        const { title, year, cast, producer, director } = req.body
        
        const newMovie = await Movie.create({
            title,
            year
        })
        newMovie.addCast(cast)
        newMovie.addProducer(producer)
        newMovie.addDirector(director)
    
        res.status(201).json(newMovie)
    } catch (err) {
        console.log(err)
    }
}

const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id
        const movieToDelete = await Movie.findOne({where: {id}})
        if (movieToDelete) {
            await movieToDelete.destroy()
            res.status(204).end()
        } else {
            res.status(404).json({error: 'Movie not found'})
        }
    } catch (err) {
        console.log(err)
    }
}

const updateMovie = async (req, res) => {
    try {
        const {title, year} = req.body
        const id = req.params.id
        const movieToUpdate = await Movie.findOne({where: {id}})
        if (movieToUpdate) {
            await movieToUpdate.update({
                title,
                year
            })
            res.status(200).json(movieToUpdate)
        } else {
            res.status(404).json({error: 'Movie not found'})
        }
    } catch (err) {
        console.log(err)
    }
}

const addActor = async (req, res) => {
    try {
        const { actor } = req.body
        const id = req.params.id 
        const currentMovie = await Movie.findOne({where: {id}})
    
        if (currentMovie) {
            currentMovie.addCast(actor)
            res.status(200).json(currentMovie)
        } else {
            res.status(404).json({error: 'Movie not found'})
        }
    } catch (err) {
        console.log(err)
    }
}

const addProducer = async (req, res) => {
    try {
        const { producer } = req.body
        const id = req.params.id 
        const currentMovie = await Movie.findOne({where: {id}})
        if (currentMovie) {
            currentMovie.addProducer(producer)
            res.status(200).json(currentMovie)
        } else {
            res.status(404).json({error: 'Movie not found'})
        }
    } catch (err) {
        console.log(err)
    }
}

const addDirector = async (req, res) => {
    try {
        const { director } = req.body
        const id = req.params.id 
        const currentMovie = await Movie.findOne({where: {id}})
        if (currentMovie) {
            currentMovie.addDirector(director)
            res.status(200).json(currentMovie)
        } else {
            res.status(404).json({error: 'Movie not found'})
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getMovies,
    getOneMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    addActor,
    addDirector,
    addProducer
}