import movieService from '../../services/movies'
import { createNotification } from './notificationReducer'

const moviesReducer = (state = [], action) => {
    switch (action.type) {
        case '@movies/init':
            return action.payload
        case '@movies/new_movie':
            return [...state, action.payload]
        case '@movies/update_movie':
            const updatedmovie = action.payload.movie
            return state.map(movie => (movie.id !== action.payload.id ? movie : updatedmovie))
        case '@movies/add_like':
            console.log(action.payload)
            return state.map(movie => (movie.id !== action.payload.id ? movie.likes: action.payload.likes))
        case '@movies/remove_movie':
            return state.filter((movie) => movie.id !== action.payload)
        default:
            return state
    }
}

export const initMovies = () => {
    return async (dispatch) => {
        const movies = await movieService.getAll()        
        dispatch({
            type: '@movies/init',
            payload: movies
        })
    }
}

export const createMovie = (movie) => {
    return async (dispatch) => {
        try {
            await movieService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
            const addedmovie = await movieService.createmovie(movie)
            dispatch( {
                type: '@movies/new_movie',
                payload: addedmovie
            })
            dispatch(createNotification(
                `New movie "${addedmovie.title}" by ${addedmovie.author} added successfuly!`,
                'success'
            ))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    } 
}

export const updateMovie = (id, movieToUpdate) => {
    return async (dispatch) => {
        try {
            await movieService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
            const updatedmovie = await movieService.update(id, movieToUpdate)
            dispatch({
                type: '@movies/update_movie',
                payload: {id: id, movie: updatedmovie}
            })
            dispatch(createNotification(`${updatedmovie.title} updated successfuly`, 'success'))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    }
}

export const removeMovie = (movie) => {
    return async (dispatch) => {
        try {
            await movieService.remove(movie.id)
            dispatch ({
                type: '@movies/remove_movie',
                payload: movie.id
            })
            dispatch(createNotification(
                `${movie.title} by ${movie.author} removed successfuly!`,
               'success'
            ))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    }
}

export default moviesReducer