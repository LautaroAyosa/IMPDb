const { Movie } = require('../models/Movie')
const { Person } = require('../models/Person')

const getMovies = async (req, res) => {
    const movies = await Movie.findAll()
    res.status(200).json(movies)
}

const getOneMovie = async (req, res) => {
    const id = req.params.id
    const movie = await Movie.findOne({
        where: {id},
        include: {
            model: Person,
            as: 'Actor'
        }
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

const getAllActors = async (req, res) => {
    const id = req.params.id
}

module.exports = {
    getMovies,
    getOneMovie,
    createMovie,
    deleteMovie,
    updateMovie
}