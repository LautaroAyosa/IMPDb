import movieService from '../../services/movies';
import mediaService from '../../services/media';
import { createNotification } from '../reducers/notificationReducer';

// Set loading
export const setLoading = (bool) => {
  return {
    type: '@movies/set_loading',
    payload: bool
  };
};

// Init movies
export const initMovies = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const movies = await movieService.getAll();
      dispatch({
        type: '@movies/init',
        payload: movies
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch({ type: '@movies/error', payload: error.message });
      dispatch(setLoading(false));
    }
  };
};

// Create Movie
export const createMovie = (movie) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let addedMovie = await movieService.create(movie);

      if (movie.gallery.length !== 0) {
        let addedMedia = await mediaService.uploadMedia(
          'movie',
          addedMovie.id,
          movie.gallery
        );
        await mediaService.setProfileImage(
          'movie',
          addedMovie.id,
          addedMedia.uploadedMedia[0].id
        );
        let addedTrailer = await mediaService.uploadMedia(
          'movie',
          addedMovie.id,
          movie.trailer
        );
        await mediaService.setMainTrailer(
          addedMovie.id,
          addedTrailer.uploadedMedia[0].id
        );
        addedMovie = await movieService.getOne(addedMovie.id);
      }
      dispatch({
        type: '@movies/new_movie',
        payload: addedMovie
      });
      dispatch(
        createNotification(
          `New movie "${addedMovie.title}" added successfully!`,
          'success'
        )
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(createNotification(error.response.data.error, 'error'));
      dispatch(setLoading(false));
    }
  };
};

// Update Movie
export const updateMovie = (id, movieToUpdate) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const updatedMovie = await movieService.update(id, movieToUpdate);
      dispatch({
        type: '@movies/update_movie',
        payload: { id, movie: updatedMovie }
      });
      dispatch(createNotification(`"${updatedMovie.title}" updated successfully`, 'success'));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(createNotification(error.response.data.error, 'error'));
      dispatch(setLoading(false));
    }
  };
};

// Remove Movie
export const removeMovie = (movie) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await movieService.remove(movie.id);
      dispatch({
        type: '@movies/remove_movie',
        payload: movie.id
      });
      dispatch(createNotification(`"${movie.title}" removed successfully!`, 'success'));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(createNotification(error.response.data.error, 'error'));
      dispatch(setLoading(false));
    }
  };
};
