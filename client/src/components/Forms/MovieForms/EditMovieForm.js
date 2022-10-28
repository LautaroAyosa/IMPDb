import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMovie } from '../../../redux/reducers/moviesReducer'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Select, setOptions, localeEs } from '@mobiscroll/react';
import { useNavigate, useParams } from 'react-router';
import $ from "jquery";



const EditMovieForm = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const movie = useSelector(state => state.movies.find(movie => movie.id === parseInt(params.id)))
    const persons = useSelector(state => state.persons)
    const [newMovie, setNewMovie] = useState({ title: movie.title, year: movie.year, image: movie.image, banner: movie.banner,cast: movie.Cast.map(actor => actor.id), producer: movie.Producers.map(producer => producer.id), director: movie.Directors.map(director => director.id) })


  // Handle CreateMovie Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateMovie(movie.id, newMovie))
    navigate(`/movies/${movie.id}`)
  }

  // Hanlde input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMovie({ ...newMovie, [name]: value })
  }

  const handleDisableToggle = (e) => {
    e.preventDefault()
    $(`input[name="${e.target.name}"]`).prop('disabled', (i,v) => !v).toggleClass('disabled')
  }
  
  setOptions({
    locale: localeEs,
    theme: 'ios',
    themeVariant: 'light'
  });

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
                    <input className='full disabled' placeholder='Title' onChange={handleInputChange} value={newMovie.title} name='title' disabled={true} />
                    <button className='toggle-edit' onClick={handleDisableToggle} name='title'>
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                  </div>
                  <div className='col15 edit-field-wrapper'>
                    <input type='number' className='full disabled' placeholder='Year' onChange={handleInputChange} value={newMovie.year} name='year' disabled={true} />
                    <button className='toggle-edit' onClick={handleDisableToggle} name='year' ><i className="fa-solid fa-pencil"></i></button>
                  </div>
                  <div className='edit-field-wrapper col1-2'>
                    <input type='string' className='full disabled' placeholder='Image URL' onChange={handleInputChange} value={newMovie.image} name='image' disabled={true} />
                    <button className='toggle-edit' onClick={handleDisableToggle} name='image' ><i className="fa-solid fa-pencil"></i></button>
                  </div>
                  <div className='edit-field-wrapper col1-2'>
                    <input type='string' className='full disabled' placeholder='Banner URL' onChange={handleInputChange} value={newMovie.banner} name='banner' disabled={true} />
                    <button className='toggle-edit' onClick={handleDisableToggle} name='banner' ><i className="fa-solid fa-pencil"></i></button>
                  </div>
                  <Select
                  data={myData}
                  defaultSelection={newMovie.cast}
                  selectMultiple={true}
                  label="Cast"
                  filter={true}
                  onChange={(event) => {
                      setNewMovie({...newMovie, [`cast`]: event.value})
                  }}
                  inputProps={{
                      cssClass: 'full mobiscroll-select',
                      inputStyle: 'box',
                      labelStyle: 'stacked',
                      placeholder: 'Please select...'
                  }}
                  />
                  <Select
                  data={myData}
                  defaultSelection={newMovie.producer}
                  selectMultiple={true}
                  label="Producers"
                  filter={true}
                  onChange={(event) => {
                      setNewMovie({...newMovie, [`producer`]: event.value})
                  }}
                  inputProps={{
                      cssClass: 'full mobiscroll-select',
                      inputStyle: 'box',
                      labelStyle: 'stacked',
                      placeholder: 'Please select...'
                  }}
                  />
                  <Select
                  data={myData}
                  defaultSelection={newMovie.director}
                  selectMultiple={true}
                  label="Directors"
                  filter={true}
                  onChange={(event) => {
                      setNewMovie({...newMovie, [`director`]: event.value})
                  }}
                  inputProps={{
                      cssClass: 'full mobiscroll-select',
                      inputStyle: 'box',
                      labelStyle: 'stacked',
                      placeholder: 'Please select...'
                  }}
                  />
                  <button className='primary-button' onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        }
    </div>
  )
}

export default EditMovieForm