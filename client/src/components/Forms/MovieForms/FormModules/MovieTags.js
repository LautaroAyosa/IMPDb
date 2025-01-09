import { useState } from "react";

const MovieTags = ({ newMovie, setNewMovie }) => {
    const [tagsInput, setTagsInput] = useState('');
  
    const handleTagsInputChange = (e) => {
      const value = e.target.value;
      if (value.includes(',')) {
        const newTags = value
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag);
        setNewMovie({ ...newMovie, tags: [...newMovie.tags, ...newTags] });
        setTagsInput('');
      } else {
        setTagsInput(value);
      }
    };
  
    const handleTagDelete = (index) => {
      const updatedTags = newMovie.tags.filter((_, i) => i !== index);
      setNewMovie({ ...newMovie, tags: updatedTags });
    };
  
    return (
      <div className="form-item">
        <label>Tags</label>
        <input
          type="text"
          value={tagsInput}
          onChange={handleTagsInputChange}
          placeholder="Mystery, Police, Drama"
        />
        <div className="tags-display">
          {newMovie.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
              <button className="delete-tag-button" type="button" onClick={() => handleTagDelete(index)}>
                x
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default MovieTags;
  