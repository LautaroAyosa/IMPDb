import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMovie } from '../../../../redux/actions/moviesActions'
import { useNavigate, useParams } from 'react-router';
import MultiSelect from '../../../MultiSelect/MultiSelect'
import GalleryUploader from '../../../GalleryUploader/GalleryUploader'


const NewMovieForm = () => {
  const navigate = useNavigate()
  const params = useParams()

  // Get the movie if the param exists
  const movie = useSelector(state =>
    params.id ? state.movies.data.find(movie => movie.id === parseInt(params.id)) : null
  );

  // Default state for a new movie
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
    gallery: [],
    trailer: []
  };

  // State for the form
  const [newMovie, setNewMovie] = useState(defaultState);

  // Update state when editing a movie or switching to "New Movie"
  useEffect(() => {
    if (movie) {
      // Populate state for editing
      setNewMovie({
        title: movie.title || '',
        synopsis: movie.synopsis || '',
        category: movie.category || '',
        releaseDate: movie.releaseDate || '',
        tags: movie.tags || [],
        duration: movie.duration || '',
        cast: movie.cast || [],
        producers: movie.producers || [],
        directors: movie.directors || [],
        gallery: movie.gallery || [],
        trailer: movie.trailer || []
      });
    } else {
      // Reset to default for a new movie
      setNewMovie(defaultState);
    }
  }, [params.id, movie]); // Watch for changes in params.id and movie

  const [tagsInput, setTagsInput] = useState(''); // Temporary input for tags
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch()
  const {data, isLoading, error} = useSelector(state => state.persons)

  const placeholders = {
    title: "The Batman",
    synopsis: "When a sadistic serial killer begins murdering key political figures in Gotham, the Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    duration: 176,
  }
  
  // Handle CreateMovie Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate forms, if errors, don't submit
    if (!validateForm()) return;
  
    // Actual Dispatching
    dispatch(createMovie(newMovie))
    setNewMovie({ 
      title: '', 
      synopsis:'', 
      category: '', 
      releaseDate: '', 
      tags: [], 
      duration: "", 
      cast: [], 
      producers: [], 
      directors: [],
      gallery: [],
      trailer: []
     })
  }

  const handleTagsInputChange = (event) => {
    const value = event.target.value;
  
    // If the input contains a comma, process the tags
    if (value.includes(',')) {
      const newTags = value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag); // Remove empty tags
      setNewMovie({ ...newMovie, tags: [...newMovie.tags, ...newTags] });
      setTagsInput(''); // Clear the temporary input
    } else {
      setTagsInput(value); // Update the temporary input
    }
  };

  const handleTagDelete = (index) => {
    const updatedTags = newMovie.tags.filter((_, i) => i !== index);
    setNewMovie({ ...newMovie, tags: updatedTags });
  };
  

  // Hanlde input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'tags') {
      // Split tags by commas, trim whitespace, and filter out empty tags
      const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag);
      setNewMovie({ ...newMovie, tags: tagsArray });
    } else {
      setNewMovie({ ...newMovie, [name]: value });
    }
  
    const fieldError = validateField(name, value);
    setErrors({ ...errors, [name]: fieldError });
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewMovie((prev) => ({
      ...prev,
      [name]: Array.from(files),
    }));
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'title':
        if (!value.trim()) error = 'Title is required.';
        break;
      case 'synopsis':
        if (!value.trim()) error = 'Synopsis is required.';
        break;
      case 'releaseDate':
        if (!value) error = 'Release date is required.';
        break;
      case 'duration':
        if (!value || isNaN(value) || value <= 0) error = 'Duration must be a positive number.';
        break;
      case 'tags':
        if (value.length === 0) error = 'At least one tag is required.';
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(newMovie).forEach((key) => {
      const error = validateField(key, newMovie[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const peopleData = data.map(person => {
    return {
      value: person.id,
      text: `${person.name} - `
    }
  })

  return (
    <div>
      <h4>Add a New Movie</h4>
      <form className='form'>
        <div className='form-row form-item' >
          <label>Movie Title</label>
          <input id='movie-title' type='text' className={`full ${errors.title ? 'error-input' : ''}`} placeholder={placeholders.title} value={newMovie.title} name='title' onChange={handleInputChange} />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        <div className='form-row form-item' >
          <label>Synopsis</label>
          <textarea id='movie-synopsis' className={`full ${errors.synopsis ? 'error-input' : ''}`} placeholder={placeholders.synopsis} value={newMovie.synopsis} name='synopsis' onChange={handleInputChange} />
          {errors.synopsis && <span className="error-message">{errors.synopsis}</span>}
        </div>
        <div className='form-row form-wrap' id='movie-secondary-info'>
          <div className='form-item'>
            <label>Category</label>
            <select id='movie-category' className='' name='category' >
              {/* ADD CATEGORY MAPPING ONCE CATEGORIES ARE CREATED */}
              <option disabled>Select a Category</option>
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>
          <div className='form-item'>
            <label>Realease Date</label>
            <input id='movie-date' className={`${errors.releaseDate ? 'error-input' : ''}`} type='date' name='releaseDate' value={newMovie.releaseDate} onChange={handleInputChange} />
            {errors.releaseDate && <span className="error-message">{errors.releaseDate}</span>}
          </div>
          <div className='form-item'>
            <label>Duration (minutes)</label>
            <input id='movie-duration' className={`${errors.duration ? 'error-input' : ''}`} type='number' min={0} name='duration' value={newMovie.duration} onChange={handleInputChange} placeholder={placeholders.duration} />
            {errors.duration && <span className="error-message">{errors.duration}</span>}
          </div>
        </div>
        <div className='form-row'>
          <GalleryUploader description="Add pictures or any content related to the movie and the people working on it." handleFileChange={handleFileChange} />
          {errors.gallery && <span className="error-message">{errors.gallery}</span>}
        </div>
        <div>
          <GalleryUploader title="Main Trailer" description="Add the Trailer, It will be shown in a sepparate section for a better user experience." handleFileChange={handleFileChange} eventName={'trailer'} />
          {errors.trailer && <span className="error-message">{errors.trailer}</span>}
        </div>
        <div className="form-row form-item">
          <label>Tags</label>
          <input
            id="movie-tags"
            className={`${errors.tags ? 'error-input' : ''}`}
            type="text"
            name="tagsInput"
            value={tagsInput}
            onChange={handleTagsInputChange}
            placeholder="Mystery, Police, Drama"
          />
          <span className="description">Type tags and press a comma to add them</span>
          {errors.tags && <span className="error-message">{errors.tags}</span>}
          <div className="tags-display">
            {newMovie.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  type="button"
                  className="delete-tag-button"
                  onClick={() => handleTagDelete(index)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className='form-wrap'>
          <div className='form-item' id='movie-cast'>
            <MultiSelect
              data={peopleData}
              label="Cast"
              onChange={(event) => {
                setNewMovie({ ...newMovie, cast: event.value });
              }}
              containerClass="col1-3"
            />
            {errors.cast && <span className="error-message">{errors.cast}</span>}
          </div>
          <div id='movie-producers'>
            <MultiSelect
              data={peopleData}
              label="Producers"
              onChange={(event) => {
                setNewMovie({ ...newMovie, producers: event.value });
              }}
              containerClass="col1-3"
            />
            {errors.producers && <span className="error-message">{errors.producers}</span>}
          </div>
          <div id='movie-directors'>
            <MultiSelect
              data={peopleData}
              label="Directors"
              onChange={(event) => {
                setNewMovie({ ...newMovie, directors: event.value });
              }}
              containerClass="col1-3"
            />
            {errors.directors && <span className="error-message">{errors.directors}</span>}
          </div>
        </div>
        
        <button className='primary-button' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default NewMovieForm