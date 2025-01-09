import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMovie } from '../../../../redux/actions/moviesActions'
import { useNavigate, useParams } from 'react-router';
import $ from "jquery";
import MultiSelect from '../../../MultiSelect/MultiSelect'


const EditMovieForm = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const movie = useSelector(state => state.movies.data.find(movie => movie.id === parseInt(params.id)))
  const persons = useSelector(state => state.persons)
  const [editMovie, setEditMovie] = useState({
    title: movie.title, 
    synopsis: movie.synopsis, 
    duration: movie.duration,
    category: movie.category,
    releaseDate: movie.releaseDate,
    tags: movie.tags.map(tag => tag.id),
    cast: movie.Cast.map(actor => actor.id), 
    producer: movie.Producers.map(producer => producer.id), 
    director: movie.Directors.map(director => director.id), 
    gallery: movie.MovieGallery, 
    trailer: movie.MainTrailer,
  })
  const [tagsInput, setTagsInput] = useState(''); // Temporary input for tags
  const [errors, setErrors] = useState({});

  const handleTagsInputChange = (event) => {
    const value = event.target.value;
  
    // If the input contains a comma, process the tags
    if (value.includes(',')) {
      const editTags = value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag); // Remove empty tags
      setEditMovie({ ...editMovie, tags: [...editMovie.tags, ...editTags] });
      setTagsInput(''); // Clear the temporary input
    } else {
      setTagsInput(value); // Update the temporary input
    }
  };
  
    const handleTagDelete = (index) => {
      const updatedTags = editMovie.tags.filter((_, i) => i !== index);
      setEditMovie({ ...editMovie, tags: updatedTags });
    };


  // Handle CreateMovie Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateMovie(movie.id, editMovie))
    navigate(`/movies/${movie.id}`)
  }

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

    Object.keys(editMovie).forEach((key) => {
      const error = validateField(key, editMovie[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hanlde input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'tags') {
      // Split tags by commas, trim whitespace, and filter out empty tags
      const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag);
      setEditMovie({ ...editMovie, tags: tagsArray });
    } else {
      setEditMovie({ ...editMovie, [name]: value });
    }
  
    const fieldError = validateField(name, value);
    setErrors({ ...errors, [name]: fieldError });
  }

  const handleDisableToggle = (e) => {
    e.preventDefault()
    $(`input[name="${e.target.name}"]`).prop('disabled', (i,v) => !v).toggleClass('disabled')
  }

  const myData = persons.map(person => {
    return {
      value: person.id,
      text: `${person.name} ${person.lastName}`
    }
  })

  return (
    <div>
        {movie &&
            <div>
                <h2>Edit "{movie.title}"</h2>
                <p>WARNING! Everything will be saved to the database once you click on the "Submit" button</p>
                <form>
                  <div className='col85 edit-field-wrapper' >
                    <input className='full disabled' placeholder='Title' onChange={handleInputChange} value={editMovie.title} name='title' disabled={true} />
                    <button className='toggle-edit' onClick={handleDisableToggle} name='title'>
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </div>
                  <div className='col15 edit-field-wrapper'>
                    <input type='date' className='full disabled' placeholder='Release Date' onChange={handleInputChange} value={editMovie.releaseDate} name='releaseDate' disabled={true} />
                    <button className='toggle-edit' onClick={handleDisableToggle} name='year' ><i className="fa-solid fa-pencil"></i></button>
                  </div>
                  <div className='edit-field-wrapper col1-2'>
                    <input type='string' className='full disabled' placeholder='Image URL' onChange={handleInputChange} value={editMovie.image} name='image' disabled={true} />
                    <button className='toggle-edit' onClick={handleDisableToggle} name='image' ><i className="fa-solid fa-pencil"></i></button>
                  </div>
                  <div className='edit-field-wrapper col1-2'>
                    <input type='string' className='full disabled' placeholder='Banner URL' onChange={handleInputChange} value={editMovie.banner} name='banner' disabled={true} />
                    <button className='toggle-edit' onClick={handleDisableToggle} name='banner' ><i className="fa-solid fa-pencil"></i></button>
                  </div>
                  <div className='full flexRowCenter'>
                    <MultiSelect
                      data={myData}
                      label="Cast"
                      preSelected={editMovie.cast}
                      onChange={(event) => {
                        setEditMovie({ ...editMovie, cast: event.value });
                      }}
                      containerClass="col1-3"
                    />
                    <MultiSelect
                      data={myData}
                      label="Producers"
                      preSelected={editMovie.producer}
                      onChange={(event) => {
                        setEditMovie({ ...editMovie, producer: event.value });
                      }}
                      containerClass="col1-3"
                    />
                    <MultiSelect
                      data={myData}
                      label="Directors"
                      preSelected={editMovie.director}
                      onChange={(event) => {
                        setEditMovie({ ...editMovie, director: event.value });
                      }}
                      containerClass="col1-3"
                    />
                  </div>
                  <button className='primary-button' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        }
    </div>
  )
}

export default EditMovieForm