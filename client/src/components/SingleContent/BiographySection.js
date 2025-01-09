import React, { useState } from "react";

const BiographySection = ({ person }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="">
      <h4>Biography</h4>
      <p
        id="biography"
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: isExpanded ? "none" : 8,
          WebkitBoxOrient: "vertical",
        }}
      >
        {person.biography}
      </p>
      <button id="read-more-btn" onClick={toggleReadMore}>
        {isExpanded ? <>Read Less <i className="fa-solid fa-caret-down"></i></> : <>Read More <i className="fa-solid fa-caret-down"></i></>}
        
      </button>
    </div>
  );
};

export default BiographySection;
