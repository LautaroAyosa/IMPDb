import React from 'react';
import AutoExpandTextarea from '../../AutoExpandTextarea/AutoExpandTextarea';

const PersonDetailsForm = ({ formData, setFormData, disableFields, handleDisableToggle, isEditing }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            {['name', 'biography', 'alternativeName', 'bornDate', 'bornPlace', 'height'].map((field) => (
                <div className='form-row'>
                    <div className='full edit-field-wrapper form-item' key={field}>
                        <label>{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                        {field === 'biography' ? (
                            <AutoExpandTextarea
                                className={`full ${isEditing && disableFields[field] ? 'disabled' : ''}`}
                                placeholder={field}
                                onChange={handleInputChange}
                                value={formData[field]}
                                name={field}
                                disabled={isEditing && disableFields[field]}
                            />
                        ) : (
                            <input
                                className={`full ${isEditing && disableFields[field] ? 'disabled' : ''}`}
                                type={field === 'bornDate' ? 'date' : field === 'height' ? 'number' : 'text'}
                                placeholder={field}
                                onChange={handleInputChange}
                                value={formData[field]}
                                name={field}
                                disabled={isEditing && disableFields[field]}
                            />
                        )}
                        {isEditing && (
                            <button className='toggle-edit' onClick={() => handleDisableToggle(field)} type="button">
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default PersonDetailsForm;