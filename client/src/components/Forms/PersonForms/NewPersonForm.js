import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Select, setOptions, localeEs } from '@mobiscroll/react';
import { createPerson } from '../../../redux/reducers/personsReducer';


const NewPersonForm = () => {
  const [newPerson, setNewPerson] = useState({ name: '', lastName: '', age: '', image: '', acted: [], produced: [], directed: [] })
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies)
  
  // Handle CreateMovie Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
      dispatch(createPerson(newPerson))
      setNewPerson({ name: '', lastName: '', age: '', image: '', acted: [], produced: [], directed: [] })
  }

  // Hanlde input change
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewPerson({ ...newPerson, [name]: value })
  }
  
  setOptions({
    locale: localeEs,
    theme: 'ios',
    themeVariant: 'light'
  });

  const myData = movies.map(movie => {
    return {
      value: movie.id,
      text: `${movie.title} - ${movie.year}`
    }
  })

  return (
    <div>
      <h2>Add a New Person</h2>
      <form>
        <input className='col1-2' placeholder='Name' onChange={handleInputChange} value={newPerson.name} name='name' />
        <input className='col1-3' placeholder='Last Name' onChange={handleInputChange} value={newPerson.lastName} name='lastName' />
        <input className='col15' placeholder='Age' onChange={handleInputChange} value={newPerson.age} name='age' />
        <input className='full' placeholder='Image URL' onChange={handleInputChange} value={newPerson.image} name='image' />
        <Select
          data={myData}
          selectMultiple={true}
          label="Acted in"
          filter={true}
          
          onChange={(event) => {
            setNewPerson({...newPerson, [`acted`]: event.value})
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
          label="Produced"
          filter={true}
          onChange={(event) => {
            setNewPerson({...newPerson, [`produced`]: event.value})
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
          label="Directed"
          filter={true}
          onChange={(event) => {
            setNewPerson({...newPerson, [`directed`]: event.value})
          }}
          inputProps={{
              cssClass: 'full mobiscroll-select',
              inputStyle: 'box',
              labelStyle: 'stacked',
              placeholder: 'Please select...'
          }}
        />
        <button className='primary-button' onClick={handleSubmit}>Create New Person</button>
      </form>
    </div>
  )
}

export default NewPersonForm
