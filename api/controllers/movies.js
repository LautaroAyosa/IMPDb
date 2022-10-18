const { Movie } = require('../models/Movie')
const { Person } = require('../models/Person')

const getMovies = async (req, res) => {
    const movies = await Movie.findAll({
        include: [
            {
                model: Person, 
                as: 'Actors',
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
                as: 'Actors',
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
    const { title, year } = req.body
    
    const newMovie = await Movie.create({
        title,
        year
    })

    res.status(200).json(newMovie)
}

const deleteMovie = async (req, res) => {
    const id = req.params.id
    const movieToDelete = await Movie.findOne({where: {id}})
    if (movieToDelete) {
        await movieToDelete.destroy()
        res.status(204).end()
    }
}

const updateMovie = async (req, res) => {
    const {title, year} = req.body
    const id = req.params.id
    const movieToUpdate = await Movie.findOne({where: {id}})
    if (movieToUpdate) {
        await movieToUpdate.update({
            title,
            year
        })
        res.status(200).json(movieToUpdate)
    }
}

const addActor = async (req, res) => {
    const { actor } = req.body
    const id = req.params.id 
    const currentMovie = await Movie.findOne({where: {id}})
    currentMovie.addActor(actor)

    res.status(200).json(currentMovie)
}

const addProducer = async (req, res) => {
    const { producer } = req.body
    const id = req.params.id 
    const currentMovie = await Movie.findOne({where: {id}})
    currentMovie.addActor(producer)

    res.status(200).json(currentMovie)
}

const addDirector = async (req, res) => {
    const { director } = req.body
    const id = req.params.id 
    const currentMovie = await Movie.findOne({where: {id}})
    currentMovie.addActor(director)

    res.status(200).json(currentMovie)
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