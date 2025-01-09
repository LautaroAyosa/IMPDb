import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMovie, updateMovie } from '../../../redux/actions/moviesActions';
import { useNavigate, useParams } from 'react-router';
import MovieDetailsForm from './FormModules/MovieDetailsForm';
import MovieTags from './FormModules/MovieTags';
import MoviePeople from './FormModules/MoviePeople';
import GalleryUploader from '../../GalleryUploader/GalleryUploader';

const NewMovieForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const movie = useSelector(state =>
    params.id ? state.movies.data.find(movie => movie.id === parseInt(params.id)) : null
  );

  const defaultState = {
    title: '',
    synopsis: '',
    category: '',
    releaseDate: '',
    tags: [],
    duration: "",
    cast: [],
    producers: [],
    directors: [],
    MovieGallery: [],
    MainTrailer: []
  };


  const [newMovie, setNewMovie] = useState(defaultState);
  const [disableFields, setDisableFields] = useState({});

  useEffect(() => {
    if (movie) {
      setNewMovie({ ...movie });
      setDisableFields(Object.keys(movie).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    } else {
      setNewMovie(defaultState);
    }
  }, [params.id, movie]);

  const handleDisableToggle = (field) => {
    setDisableFields({ ...disableFields, [field]: !disableFields[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      // Editing an existing movie
      dispatch(updateMovie(movie.id, newMovie));
      navigate(`/movies/${movie.id}`);
    } else {
      // Creating a new movie
      dispatch(createMovie(newMovie));
      setNewMovie(defaultState);
      navigate('/movies');
    }
  };


  return (
    <div>
      <h4>{params.id ? 'Edit Movie' : 'Add a New Movie'}</h4>
      <form className="form" onSubmit={handleSubmit}>
        <MovieDetailsForm
            newMovie={newMovie}
            setNewMovie={setNewMovie}
            disableFields={disableFields}
            handleDisableToggle={handleDisableToggle}
            isEditing={!!params.id} // Pass true if editing, false if creating
        />
        
        {/* PREDEFINED VALUES BREAK THIS. 
        NEED TO THINK OF A WAY OF MODIFYING ONLY THE MODIFIED IMAGES IN THE DB (DELETE And UPLOAD). */}
        {!params.id ? <>
        <GalleryUploader
            description="Add pictures or any content related to the movie."
            handleFileChange={(e) =>
                setNewMovie((prev) => ({
                ...prev,
                MovieGallery: Array.from(e.target.files),
                }))
            }
            eventName='MovieGallery'
            predefinedValues={newMovie.MovieGallery}
        />
        <GalleryUploader
            title="Main Trailer"
            description="Add the trailer. It will be shown in a separate section."
            handleFileChange={(e) =>
                setNewMovie((prev) => ({
                ...prev,
                MainTrailer: Array.from(e.target.files),
                }))
            }
            eventName='MainTrailer'
            predefinedValues={newMovie.MainTrailer}
        />
        </> : <></>}
        <MovieTags newMovie={newMovie} setNewMovie={setNewMovie} />
        <MoviePeople newMovie={newMovie} setNewMovie={setNewMovie} preSelected={newMovie} />
        <button className="primary-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewMovieForm;
