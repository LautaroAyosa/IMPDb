import React from "react";
import { useNavigate } from "react-router-dom";

const PostNavigation = ({ currentId, items, type }) => {
    const navigate = useNavigate();

    // Find the index of the current item in the list
    const currentIndex = items.findIndex((item) => item.id === currentId);

    // Determine previous and next item
    const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
    const nextItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

    // Function to handle navigation and scroll to top
    const handleNavigation = (itemId) => {
        if (itemId) {
            navigate(`/${type}/${itemId}`);
            window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
        }
    };

  return (
    <div className="post-navigation">
      <button
        className={`nav-button left ${!prevItem ? "disabled" : ""}`}
        onClick={() => handleNavigation(prevItem?.id) }
        disabled={!prevItem}
      >
        ← Previous {type === "movies" ? "Movie" : "Person"}
      </button>
      <button
        className={`nav-button right ${!nextItem ? "disabled" : ""}`}
        onClick={() => handleNavigation(nextItem?.id) }
        disabled={!nextItem}
      >
        Next {type === "movies" ? "Movie" : "Person"} →
      </button>
    </div>
  );
};

export default PostNavigation;
