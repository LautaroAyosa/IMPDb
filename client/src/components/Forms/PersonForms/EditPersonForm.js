import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router';
import $ from "jquery";
import { updatePerson } from '../../../redux/actions/personsActions';
import MultiSelect from '../../MultiSelect/MultiSelect';



const EditPersonForm = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const person = useSelector(state => state.persons.find(person => person.id === parseInt(params.id)))
    const persons = useSelector(state => state.persons.filter(person => person.id !== parseInt(params.id)));
    const movies = useSelector(state => state.movies)
    const [editPerson, setEditPerson] = useState({ 
      name: person.name, 
      biography: person.biography, 
      profileImage: person.ProfileImage, 
      gallery: person.gallery, 
      alternativeName: person.personalDetails.alternativeName, 
      height: person.personalDetails.height, 
      bornDate: person.personalDetails.born.date,
      bornPlace: person.personalDetails.born.place,
      spouse: person.Spouse, 
      children: person.Children.map(child => child.id), 
      parents: person.Parents.map(parent => parent.id),
      relatives: person.Relatives,
      moreInfo: person.moreInfo, 
      acted: person.ActedIn.map(actor => actor.id), 
      produced: person.Produced.map(producer => producer.id), 
      directed: person.Directed.map(director => director.id) 
    })

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


  const myData = movies.map(movie => {
    return {
      value: movie.id,
      text: `${movie.title} - ${movie.year}`
    }
  })
  const myPersons = persons.map(person => {
    return {
      value: person.id,
      text: `${person.name}`,
    }
  })

  return (
    <div>
        {person &&
          <div>
            <h2>Edit {person.name}</h2>
            <form>
              <div className='full edit-field-wrapper'>
                <input className='full disabled' placeholder='Name' onChange={handleInputChange} value={editPerson.name} name='name' disabled />
                <button className='toggle-edit' onClick={handleDisableToggle} name='name'>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </div>
              <div className='full edit-field-wrapper'>
                <textarea className='full disabled' placeholder='Biography' onChange={handleInputChange} value={editPerson.biography} name='biography' disabled />
                <button className='toggle-edit' onClick={handleDisableToggle} name='biography'>
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </div>
              <div className='full'>
                <h3>Gallery</h3>
                <div className='flexRowCenter full'>
                  <div>
                    <h5>Profile Image</h5>
                    <p>This will be the person's main picture. Recommended file size 1000x500</p>
                    <input className='full' type='file' onChange={handleInputChange}  name='profileImage' />
                  </div>
                  <div>
                    <h5>Gallery</h5>
                    <p>Add more pictures and videos of this person's important moments.</p>
                    <input className='full' type='file' multiple onChange={handleInputChange} name='gallery' />
                  </div>
                </div>
              </div>
              <div className='flexRowCenter full'>
                <div className='col1-3 edit-field-wrapper'>
                  <input className='full disabled' placeholder='Alternative Name' onChange={handleInputChange} value={editPerson.alternativeName} name='alternativeName' disabled />
                  <button className='toggle-edit' onClick={handleDisableToggle} name='alternativeName'>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </div>
                <div className='col15 edit-field-wrapper'>
                  <input className='full disabled' type='number' min={0} max={350} placeholder='Height in cm' onChange={handleInputChange} value={editPerson.height} name='height' disabled />
                  <button className='toggle-edit' onClick={handleDisableToggle} name='height'>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </div>
                <div className='col15 edit-field-wrapper'>
                  <input className='full disabled' type='date' placeholder='Born Date' onChange={handleInputChange} value={editPerson.bornDate} name='bornDate' disabled />
                  <button className='toggle-edit' onClick={handleDisableToggle} name='bornDate'>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </div>
                <div className='col1-3 edit-field-wrapper'>
                  <input className='full disabled' placeholder='Born Place' onChange={handleInputChange} value={editPerson.bornPlace} name='bornPlace' disabled />
                  <button className='toggle-edit' onClick={handleDisableToggle} name='bornPlace'>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </div>
              </div>
              <div>
                <h3>Family</h3>
                <div className='full flexRowCenter'>
                  <MultiSelect
                    data={myPersons}
                    label="Spouse"
                    preSelected={editPerson.spouse}
                    additionalFields={["maritalStatus", "year"]}
                    onChange={(event) => {
                      setEditPerson({ ...editPerson, spouse: event.value });
                    }}
                    containerClass="col1-2"
                  />
                  <MultiSelect
                    data={myPersons}
                    label="Children"
                    preSelected={editPerson.children}
                    onChange={(event) => {
                      setEditPerson({ ...editPerson, children: event.value });
                    }}
                    containerClass="col1-2"
                  />
                </div>
                <div className='full flexRowCenter'>
                  <MultiSelect
                    data={myPersons}
                    label="Parents"
                    preSelected={editPerson.parents}
                    onChange={(event) => {
                      setEditPerson({ ...editPerson, parents: event.value });
                    }}
                    containerClass="col1-2"
                  />
                  <MultiSelect
                    data={myPersons}
                    label="Relatives"
                    preSelected={editPerson.relatives}
                    additionalFields={["relation"]}
                    onChange={(event) => {
                      setEditPerson({ ...editPerson, relatives: event.value });
                    }}
                    containerClass="col1-2"
                  />
                </div>
              </div>
              <div className='full flexRowCenter'>
                <MultiSelect
                  data={myData}
                  label="Acted in"
                  preSelected={editPerson.acted}
                  onChange={(event) => {
                    setEditPerson({ ...editPerson, acted: event.value });
                  }}
                  containerClass="col1-3"
                />
                <MultiSelect
                  data={myData}
                  label="Produced"
                  preSelected={editPerson.produced}
                  onChange={(event) => {
                    setEditPerson({ ...editPerson, produced: event.value });
                  }}
                  containerClass="col1-3"
                />
                <MultiSelect
                  data={myData}
                  label="Directed"
                  preSelected={editPerson.directed}
                  onChange={(event) => {
                    setEditPerson({ ...editPerson, directed: event.value });
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

export default EditPersonForm