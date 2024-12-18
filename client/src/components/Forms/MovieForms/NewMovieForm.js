import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMovie } from '../../../redux/reducers/moviesReducer'


const NewMovieForm = () => {
  const [newMovie, setNewMovie] = useState({ title: '', year: '', cast: [], producer: [], director: [] })
  const dispatch = useDispatch()
  const persons = useSelector(state => state.persons)
  
  // Handle CreateMovie Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
      dispatch(createMovie(newMovie))
      setNewMovie({ title: '', year: '', image: '', cast: [], producer: [], director: [] })
  }

  // Hanlde input change
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewMovie({ ...newMovie, [name]: value })
  }

  const myData = persons.map(person => {
    return {
      value: person.id,
      text: `${person.name} ${person.lastName}`
    }
  })

  return (
    <div>
      <h2>Add a New Movie</h2>
      <form>
        <input className='col85' placeholder='Title' onChange={handleInputChange} value={newMovie.title} name='title' />
        <input className='col15' placeholder='Year' onChange={handleInputChange} value={newMovie.year} name='year' />
        <input className='col1-2' placeholder='Image URL' onChange={handleInputChange} value={newMovie.image} name='image' />
        <input className='col1-2' placeholder='Banner URL' onChange={handleInputChange} value={newMovie.banner} name='banner' />
        {/* <Select
          data={myData}
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
        /> */}
        <button className='primary-button' onClick={handleSubmit}>Create New Movie</button>
      </form>
    </div>
  )
}

export default NewMovieForm