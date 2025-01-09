const { Movie, Person } = require('../models');
const { getMovieIncludes } = require('./helper');

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll({
            include: getMovieIncludes(),
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        res.status(200).json(movies)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while fetching movies.' });
    }


}

const getOneMovie = async (req, res) => {
    try {
        const id = req.params.id
        const movie = await Movie.findOne({
            where: {id},
            include: getMovieIncludes(),
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        res.status(200).json(movie)
        if (!movie) {
            res.status(404).json({error: 'Movie not found'})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while fetching movie.' });
    }
}

const createMovie = async (req, res) => {

    try {
        const { title, releaseDate, duration, category, tags, synopsis, cast, producers, directors } = req.body

        // const user = req.user
        // const token = req.token
        // Add Authentication before creating?
        
        const newMovie = await Movie.create({
            title,
            releaseDate,
            duration,
            category,
            tags,
            synopsis,

        })
        await newMovie.addCast(cast.map(actor => actor.id))
        await newMovie.addProducer(producers.map(producer => producer.id))
        await newMovie.addDirector(directors.map(director => director.id))

        const addedMovie = await Movie.findOne({
            where: {id: newMovie.id},
            include: getMovieIncludes(),
            attributes: {exclude: ['createdAt', 'updatedAt']}
        }) 
    
        res.status(201).json(addedMovie)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while creating the movie.' });
    }
}

const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id
        const movieToDelete = await Movie.findOne({where: {id}})
        if (movieToDelete) {
            await movieToDelete.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while trying to delete the movie.' });
    }
}

const updateMovie = async (req, res) => {
    try {
        const { title, releaseDate, duration, category, tags, synopsis, cast, producer, director } = req.body
        const id = req.params.id;

        console.log(title, releaseDate, duration, category, tags, synopsis, cast, producer, director)

        const movieToUpdate = await Movie.findOne({ where: { id } });

        if (movieToUpdate) {
            // Update the movie with the provided fields
            const updateResult = await movieToUpdate.update({
                title,
                releaseDate,
                duration,
                category,
                tags,
                synopsis
            });

            if (cast) await updateResult.setCast(cast.map(actor => actor.id))
            if (producer) await updateResult.setProducers(producer.map(producer => producer.id))
            if (director) await updateResult.setDirectors(director.map(director => director.id))

            const updatedMovie = await Movie.findOne({
                where: {id: updateResult.id},
                include: getMovieIncludes(),
                attributes: {exclude: ['createdAt', 'updatedAt']}
            }) 
            res.status(200).json(updatedMovie)

        } else {
            res.status(404).json({error: 'Movie not found'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while updating the movie.' });
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