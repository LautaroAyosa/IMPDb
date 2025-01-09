import React, { useState } from "react";
import Modal from "react-modal";

const MediaGallery = ({ media }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [portraitImages, setPortraitImages] = useState({});

    // Lightbox handler
    const openLightbox = (image) => setSelectedImage(image);
    const closeLightbox = () => setSelectedImage(null);

    // Show only the first 6 images unless "View More" is clicked
    // const visibleMedia = showAll ? media : media.slice(0, 6);
    const showViewMore = media?.length > 6 && !showAll;

    // Detect portrait images dynamically
    // const handleImageLoad = (event, id) => {
    //     if (event.target.naturalHeight > event.target.naturalWidth) {
    //         setPortraitImages((prev) => ({ ...prev, [id]: true }));
    //     }
    // };

    const rowCount = 2;
    const columns = Math.ceil(media?.length / rowCount);
  
    // Split images into 2 rows
    const rows = Array.from({ length: rowCount }, (_, rowIndex) =>
      media?.slice(rowIndex * columns, rowIndex * columns + columns)
    );

    return (
        <div>
            <div className="header">
                <h2>Gallery <span>{media?.length}</span></h2>
                <a href="#" className="add-photo">+ Add photo</a>
            </div>
            { media?.length > 1 ? 
                <div className="masonry-gallery">
                    {rows.map((row, rowIndex) => (
                        <div className="masonry-row" key={`row-${rowIndex}`}>
                        {row.map((image, index) => (
                            <div className="masonry-item" key={`image-${index}`} onClick={() => openLightbox(image.publicId)}>
                                <img src={`https://res.cloudinary.com/dpsviovus/image/upload/c_limit,h_1000,w_1000/f_webp/q_auto:eco/${image.publicId}`} alt={`Gallery Image ${index}`} />
                            </div>
                        ))}
                        </div>
                    ))}
                </div>
                : 
                <div className='media-section-alternative'>
                    No Gallery Available for this Movie
                </div>
            }

            {showViewMore && (
                <button className="view-more-btn" onClick={() => setShowAll(true)}>
                    View More
                </button>
            )}

            {/* Lightbox Modal */}
            <Modal isOpen={!!selectedImage} onRequestClose={closeLightbox} className="lightbox-modal" overlayClassName="lightbox-overlay">
                {selectedImage && <img src={`https://res.cloudinary.com/dpsviovus/image/upload/c_limit,h_1000,w_1000/f_webp/q_auto:eco/${selectedImage}`} alt="Lightbox" />}
                <button className="close-btn" onClick={closeLightbox}>✖</button>
            </Modal>
        </div>
    );
};

export default MediaGallery;
