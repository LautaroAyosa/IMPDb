const MovieDetailsForm = ({ newMovie, setNewMovie, disableFields, handleDisableToggle, isEditing }) => {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure releaseDate is formatted properly for type="date"
    if (name === 'releaseDate') {
      const formattedDate = value; // HTML date inputs already return in YYYY-MM-DD format
      setNewMovie({ ...newMovie, releaseDate: formattedDate });
    } else {
      setNewMovie({ ...newMovie, [name]: value });
    }
  };

  // Extract only the date (YYYY-MM-DD) from releaseDate
  const formatDateForInput = (datetime) => {
    return datetime ? datetime.split('T')[0] : ''; // Strip the time part if present
  };
  
    return (
      <div className="form__movie-details">
        <div className="edit-field-wrapper form-item" >
          <label className="">Title</label>
          <input
            className={`full textarea ${isEditing && disableFields['title'] ? 'disabled' : ''}`}
            placeholder='Title'
            onChange={handleInputChange}
            value={newMovie['title']}
            name='title'
            disabled={isEditing && disableFields['title']} // Only disable when editing
          />
          {isEditing && ( // Show toggle button only when editing
            <button
              className="toggle-edit"
              onClick={() => handleDisableToggle('title')}
              type="button"
            >
              <i className="fa-solid fa-pencil"></i>
            </button>
          )}
        </div>
        <div className="edit-field-wrapper form-item" >
          <label className="">Synopsis</label>
          <textarea
            className={`full textarea ${isEditing && disableFields['synopsis'] ? 'disabled' : ''}`}
            placeholder='synopsis'
            onChange={handleInputChange}
            value={newMovie['synopsis']}
            name='synopsis'
            disabled={isEditing && disableFields['synopsis']} // Only disable when editing
          />
          {isEditing && ( // Show toggle button only when editing
            <button
              className="toggle-edit"
              onClick={() => handleDisableToggle('synopsis')}
              type="button"
            >
              <i className="fa-solid fa-pencil"></i>
            </button>
          )}
        </div>

        <div className="form-row form-wrap">
          <div className="edit-field-wrapper form-item" >
            <label className="">Category</label>
            <select 
              className={`${isEditing && disableFields['category'] ? 'disabled' : ''}`}
              disabled={isEditing && disableFields['category']} // Only disable when editing
              defaultValue={1}
            > 
              <option value={1} disabled>Select a Category</option>
            </select>
            {isEditing && ( // Show toggle button only when editing
              <button
                className="toggle-edit"
                onClick={() => handleDisableToggle('category')}
                type="button"
              >
                <i className="fa-solid fa-pencil"></i>
              </button>
            )}
          </div>
          {['releaseDate', 'duration'].map((field) => (
            <div className="edit-field-wrapper form-item" key={field}>
              <label className="">{field === 'releaseDate' ? 'Release Date' : 'Duration (in min)'}</label>
              <input
                className={`${isEditing && disableFields[field] ? 'disabled' : ''}`}
                type={field === 'releaseDate' ? 'date' : 'number'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleInputChange}
                value={field === 'releaseDate' ? formatDateForInput(newMovie[field]) : newMovie[field]}
                name={field}
                disabled={isEditing && disableFields[field]} // Only disable when editing
              />
              {isEditing && ( // Show toggle button only when editing
                <button
                  className="toggle-edit"
                  onClick={() => handleDisableToggle(field)}
                  type="button"
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MovieDetailsForm;
  