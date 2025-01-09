// import movieService from '../../services/movies'
// import mediaService from '../../services/media'
// import { createNotification } from './notificationReducer'

const initialState = {
    data: [],
    isLoading: false,
    error: null
};
  
const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
      case '@movies/set_loading':
        return {
          ...state,
          isLoading: action.payload
        };
      case '@movies/init':
        return {
          ...state,
          data: action.payload
        };
      case '@movies/get_movie': {
        const fullMovie = action.payload.movie;
        return {
          ...state,
          data: state.data.map((m) =>
            m.id !== action.payload.id ? m : fullMovie
          )
        };
      }
      case '@movies/new_movie':
        return {
          ...state,
          data: [...state.data, action.payload]
        };
      case '@movies/update_movie': {
        const updatedMovie = action.payload.movie;
        return {
          ...state,
          data: state.data.map((m) =>
            m.id !== action.payload.id ? m : updatedMovie
          )
        };
      }
      case '@movies/remove_movie':
        return {
          ...state,
          data: state.data.filter((m) => m.id !== action.payload)
        };
      case '@movies/error':
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
};

export default moviesReducer;
  

// export const initMovies = () => {
//     return async (dispatch) => {
//         const movies = await movieService.getAll()        
//         dispatch({
//             type: '@movies/init',
//             payload: movies
//         })
//     }
// }

// export const createMovie = (movie) => {
//     return async (dispatch) => {
//         try {
//             // Create New Movie
//             let addedMovie = await movieService.create(movie)
//             console.log(movie)

//             if (movie.gallery.length !== 0) {
//                 // If images ARE provided, upload them and dispatch the new movie
//                 // with their images to redux and notify the success

//                 // Upload Media
//                 let addedMedia = await mediaService.uploadMedia('movie', addedMovie.id, movie.gallery)
//                 await mediaService.setProfileImage('movie', addedMovie.id, addedMedia.uploadedMedia[0].id)
//                 let addedTrailer = await mediaService.uploadMedia('movie', addedMovie.id, movie.trailer)
//                 console.log(addedTrailer)
//                 await mediaService.setMainTrailer(addedMovie.id, addedTrailer.uploadedMedia[0].id)
//                 addedMovie = await movieService.getOne(addedMovie.id)
//             }
//             dispatch( {
//                 type: '@movies/new_movie',
//                 payload: addedMovie
//             })
//             dispatch(createNotification(
//                 `New movie "${addedMovie.title}" added successfuly!`,
//                 'success'
//             ))
//         } catch (error) {
//             console.log(error)
//             dispatch(createNotification(error.response.data.error, 'error'))
//         }
//     } 
// }

// export const updateMovie = (id, movieToUpdate) => {
//     return async (dispatch) => {
//         try {
//             const updatedMovie = await movieService.update(id, movieToUpdate)
//             dispatch({
//                 type: '@movies/update_movie',
//                 payload: {id: id, movie: updatedMovie}
//             })
//             dispatch(createNotification(`"${updatedMovie.title}" updated successfuly`, 'success'))
//         } catch (error) {
//             dispatch(createNotification(error.response.data.error, 'error'))
//         }
//     }
// }

// export const removeMovie = (movie) => {
//     return async (dispatch) => {
//         try {
//             await movieService.remove(movie.id)
//             dispatch ({
//                 type: '@movies/remove_movie',
//                 payload: movie.id
//             })
//             dispatch(createNotification(
//                 `"${movie.title}" removed successfuly!`,
//                'success'
//             ))
//         } catch (error) {
//             dispatch(createNotification(error.response.data.error, 'error'))
//         }
//     }
// }

// export default moviesReducer