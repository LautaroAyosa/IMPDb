import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from '../../MultiSelect/MultiSelect';
import { createPerson } from '../../../redux/actions/personsActions';
import GalleryUploader from '../../GalleryUploader/GalleryUploader';
import AutoExpandTextarea from '../AutoExpandTextarea/AutoExpandTextarea';


const NewPersonForm = () => {
  const [newPerson, setNewPerson] = useState({
    name: '',
    biography: '',
    alternativeName: '',
    height: '',
    bornDate: '',
    bornPlace: '',
    moreInfo: [],
    spouses: [],
    relatives: [],
    children: [],
    parents: [],
    acted: [],
    produced: [],
    directed: [],
    gallery: []
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies);
  const persons = useSelector(state => state.persons);

  // Validation logic
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required.';
        break;
      case 'biography':
        if (!value.trim()) error = 'Biography is required.';
        break;
      case 'height':
        if (!value.trim()) {
          error = 'Height is required.';
        } else if (isNaN(value) || value <= 0 || value > 350) {
          error = 'Height must be between 1 and 350 cm.';
        }
        break;
      case 'bornDate':
        if (!value) error = 'Birth date is required.';
        break;
      case 'bornPlace':
        if (!value.trim()) error = 'Birth place is required.';
        break;
      default:
        break;
    }

    return error;
  };

  const validateFunFacts = () => {
    const funFactErrors = {};
    newPerson.moreInfo.forEach((fact, index) => {
      if (!fact.trim()) {
        funFactErrors[`moreInfo-${index}`] = `Fun fact #${index + 1} is empty. Fill it in or remove it.`;
      }
    });
    return funFactErrors;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(newPerson).forEach((key) => {
      if (key !== 'moreInfo') {
        const error = validateField(key, newPerson[key]);
        if (error) newErrors[key] = error;
      }
    });

    const funFactErrors = validateFunFacts();
    setErrors({ ...newErrors, ...funFactErrors });
    return Object.keys(newErrors).length === 0 && Object.keys(funFactErrors).length === 0;
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only continue if there aren't any errors
    if (!validateForm()) return;

    dispatch(createPerson(newPerson));
    setNewPerson({
      name: '',
      biography: '',
      alternativeName: '',
      height: '',
      bornDate: '',
      bornPlace: '',
      moreInfo: [],
      spouses: [],
      relatives: [],
      children: [],
      parents: [],
      acted: [],
      produced: [],
      directed: [],
      gallery: []
    });
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Hanlde Errors
    const fieldError = validateField(name, value);
    setErrors({ ...errors, [name]: fieldError });

    setNewPerson({ ...newPerson, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewPerson((prev) => ({
      ...prev,
      [name]: name === 'gallery' ? Array.from(files) : files[0],
    }));
  };


  // Handle adding new rows for moreInfo
  const addMoreInfoRow = () => {
    setNewPerson({
      ...newPerson,
      moreInfo: [...newPerson.moreInfo, '']
    });
  };

  const removeMoreInfoRow = (index) => {
    const updatedMoreInfo = newPerson.moreInfo.filter((_, i) => i !== index);
    setNewPerson({ ...newPerson, moreInfo: updatedMoreInfo });
    const updatedErrors = { ...errors };
    delete updatedErrors[`moreInfo-${index}`];
    setErrors(updatedErrors);
  };

  const updateMoreInfoRow = (index, value) => {
    const updatedMoreInfo = [...newPerson.moreInfo];
    updatedMoreInfo[index] = value;
    setNewPerson({ ...newPerson, moreInfo: updatedMoreInfo });

    const error = value.trim() ? '' : `Fun fact #${index + 1} is empty. Fill it in or remove it.`;
    setErrors({ ...errors, [`moreInfo-${index}`]: error });
  };

  const moviesData = movies.data.map(movie => ({
    value: movie.id,
    text: `${movie.title} - ${movie.year}`
  }));

  const personsData = persons.data.map(person => ({
    value: person.id,
    text: person.name
  }));

  return (
    <div>
      <h4>Add a New Person</h4>
      <pre>{JSON.stringify(newPerson, null, 3)}</pre>
      <form className='form' id='new-person-form'>
        <div className='form-row form-item'>
          <label>Full Name</label>
          <input className={`full ${errors.name ? 'error-input' : ''}`} placeholder='Name' onChange={handleInputChange} value={newPerson.name} name='name' />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className='form-row form-item'>
          <label>Biography</label>
          <AutoExpandTextarea className={`full ${errors.biography ? 'error-input' : ''}`} placeholder='Biography' onChange={handleInputChange} value={newPerson.biography} name='biography' />
          {errors.biography && <span className="error-message">{errors.biography}</span>}
        </div>
        <div className='form-row'>
          <GalleryUploader handleFileChange={handleFileChange} />
        </div>
        <div className='form-section'>
          <h5>Extra Information</h5>
          <div className='form-row form-wrap' id='person-form__extra-information'>
            <div className='form-item'>
              <label>Alternative Name</label>
              <input className='' placeholder='Alternative Name' onChange={handleInputChange} value={newPerson.alternativeName} name='alternativeName' />
            </div>
            <div className='form-item'>
              <label>Height (in cm)</label>
              <input className={`${errors.height ? 'error-input' : ''}`} type='number' min={0} max={350} placeholder='Height in cm' onChange={handleInputChange} value={newPerson.height} name='height' />
              {errors.height && <span className="error-message">{errors.height}</span>}
            </div>
            <div className='form-item'>
              <label>Birth Date</label>
              <input className={`${errors.bornDate ? 'error-input' : ''}`} type='date' placeholder='Born Date' onChange={handleInputChange} value={newPerson.bornDate} name='bornDate' />
              {errors.bornDate && <span className="error-message">{errors.bornDate}</span>}
            </div>
            <div className='form-item' >
              <label>Birth Place</label>
              <input className={`${errors.bornPlace ? 'error-input' : ''}`} placeholder='Born Place' onChange={handleInputChange} value={newPerson.bornPlace} name='bornPlace' />
              {errors.bornPlace && <span className="error-message">{errors.bornPlace}</span>}
            </div>
          </div>
        </div>
        <div className='form-section'>
          <h5>Family</h5>
          <div className=''>
            <div className='form-wrap'>
              <MultiSelect
                data={personsData}
                label="Relatives"
                additionalFields={["relation"]}
                onChange={(event) => {
                  setNewPerson({ ...newPerson, relatives: event });
                }}
              />
              <MultiSelect
                data={personsData}
                label="Spouses"
                additionalFields={["maritalStatus", "year"]}
                onChange={(event) => {
                  setNewPerson({ ...newPerson, spouses: event });
                }}
              />
            </div>
            <div className='form-wrap'>
              <div className='form-item'>
                <MultiSelect
                  data={personsData}
                  label="Children"
                  onChange={(event) => {
                    setNewPerson({ ...newPerson, children: event });
                  }}
                  />
              </div>
              <div className='form-item'>
                <MultiSelect
                  data={personsData}
                  label="Parents"
                  onChange={(event) => {
                    setNewPerson({ ...newPerson, parents: event });
                  }}
                  />
              </div>
            </div>
          </div>
        </div>
        <div className='form-section' id='fun-facts'>
          <h5>Fun Facts or More Info</h5>
          {newPerson.moreInfo.map((info, index) => (
            <div key={index} className='form-row'>
              <div className='form-item full'>
                <AutoExpandTextarea
                  className={`full ${errors[`moreInfo-${index}`] ? 'error-input' : ''}`}
                  placeholder="Content"
                  value={info}
                  onChange={(e) => updateMoreInfoRow(index, e.target.value)}
                  id="textarea"
                />
                {errors[`moreInfo-${index}`] && (
                  <span className="error-message">{errors[`moreInfo-${index}`]}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeMoreInfoRow(index)}
                className="delete-button"
              >
                Remove
              </button>
            </div>
          ))}
          { newPerson.moreInfo.length === 0 ? <p>You're currently not adding any fun facts about this person</p> : ""}
          <button type='button' onClick={addMoreInfoRow} className='secondaty-button submitButton'>Add More Info</button>
        </div> 
        <div> 
          <h5>Participation in Movies</h5>
          <div className='form-wrap'>
            <div className='form-item'>
              <MultiSelect
                data={moviesData}
                label="Acted In"
                onChange={(event) => {
                  setNewPerson({ ...newPerson, acted: event });
                }}
                />
            </div>
            <div className='form-item'>
              <MultiSelect
                data={moviesData}
                label="Produced"
                onChange={(event) => setNewPerson({ ...newPerson, produced: event })}
                containerClass="col1-3"
              />
            </div>
            <div className='form-item'>
              <MultiSelect
                data={moviesData}
                label="Directed"
                onChange={(event) => setNewPerson({ ...newPerson, directed: event })}
                containerClass="col1-3"
              />
            </div>
          </div>
        </div>
        <button className='primary-button submitButton' onClick={handleSubmit}>Create New Person</button>
      </form>
    </div>
  );
};

export default NewPersonForm;