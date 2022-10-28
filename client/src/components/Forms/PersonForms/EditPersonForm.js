import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Select, setOptions, localeEs } from '@mobiscroll/react';
import { useNavigate, useParams } from 'react-router';
import $ from "jquery";
import { updatePerson } from '../../../redux/reducers/personsReducer';



const EditPersonForm = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const person = useSelector(state => state.persons.find(person => person.id === parseInt(params.id)))
    const movies = useSelector(state => state.movies)
    const [editPerson, setEditPerson] = useState({ name: person.name, lastName: person.lastName, age: person.age, image: person.image, acted: person.ActedIn.map(actor => actor.id), produced: person.Produced.map(producer => producer.id), directed: person.Directed.map(director => director.id) })

  // Handle CreateMovie Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updatePerson(person.id, editPerson))
    navigate(`/people/${person.id}`)
  }

  // Hanlde input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditPerson({ ...editPerson, [name]: value })
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

  const myData = movies.map(movie => {
    return {
      value: movie.id,
      text: `${movie.title} - ${movie.year}`
    }
  })

  return (
    <div>
        {person &&
          <div>
            <h2>Edit {person.name} {person.lastName}</h2>
            <form>
              <div className='col1-2 edit-field-wrapper'>
                <input className='full disabled' placeholder='Name' onChange={handleInputChange} value={editPerson.name} name='name' disabled />
                <button className='toggle-edit' onClick={handleDisableToggle} name='name'>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </div>
              <div className='col1-3 edit-field-wrapper'>
                <input className='disabled full' placeholder='Last Name' onChange={handleInputChange} value={editPerson.lastName} name='lastName' disabled />
                <button className='toggle-edit' onClick={handleDisableToggle} name='lastName'>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </div>
              <div className='col15 edit-field-wrapper'>
                <input className='full disabled' placeholder='Age' onChange={handleInputChange} value={editPerson.age} name='age' disabled />
                <button className='toggle-edit' onClick={handleDisableToggle} name='age'>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </div>
              <div className='full edit-field-wrapper'>
                <input className='full disabled' placeholder='Image URL' onChange={handleInputChange} value={editPerson.image} name='image' disabled />
                <button className='toggle-edit' onClick={handleDisableToggle} name='image'>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </div>
              <Select
                data={myData}
                defaultSelection={editPerson.acted}
                selectMultiple={true}
                label="Acted in"
                filter={true} 
                onChange={(event) => {
                  setEditPerson({...editPerson, [`acted`]: event.value})
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
                defaultSelection={editPerson.produced}
                selectMultiple={true}
                label="Produced"
                filter={true}
                onChange={(event) => {
                  setEditPerson({...editPerson, [`produced`]: event.value})
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
                defaultSelection={editPerson.directed}
                selectMultiple={true}
                label="Directed"
                filter={true}
                onChange={(event) => {
                  setEditPerson({...editPerson, [`directed`]: event.value})
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

export default EditPersonForm