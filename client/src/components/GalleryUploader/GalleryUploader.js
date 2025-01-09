import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const GalleryUploader = ({ handleFileChange, title, description, eventName, predefinedValues = [] }) => {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState(null);
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "video/mp4"];

  if (!eventName) { eventName = "gallery"}


  const generateVideoThumbnail = async (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth / 2;
        canvas.height = video.videoHeight / 2;
        const ctx = canvas.getContext("2d");

        video.currentTime = 1;
        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/png"));
        };

        video.onerror = () => {
          resolve(null);
        };
      };
    });
  };

  
  

  const onDrop = async (acceptedFiles) => {
    const validFiles = [];
    const invalidFiles = [];

    for (const file of acceptedFiles) {
      if (allowedTypes.includes(file.type)) {
        const isVideo = file.type.startsWith("video");
        const preview = isVideo
          ? await generateVideoThumbnail(file)
          : URL.createObjectURL(file);

        validFiles.push({
          id: `${file.name}-${Date.now()}`,
          file,
          type: isVideo ? "video" : "image",
          preview,
        });
      } else {
        invalidFiles.push(file.name);
      }
    }

    if (invalidFiles.length > 0) {
      setError(
        `The following files have invalid types: ${invalidFiles.join(", ")}. Only JPG, JPEG, PNG, and MP4 are allowed.`
      );
    } else {
      setError(null);
    }
    if (validFiles.length > 0) {
      const updatedGallery = [...gallery, ...validFiles];
      setGallery(updatedGallery);
      handleFileChange({
        target: { name: eventName, files: updatedGallery.map((item) => item.file) },
      });
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedGallery = Array.from(gallery);
    const [movedItem] = reorderedGallery.splice(result.source.index, 1);
    reorderedGallery.splice(result.destination.index, 0, movedItem);
    setGallery(reorderedGallery);
    handleFileChange({
      target: { name: eventName, files: reorderedGallery.map((item) => item.file) },
    });
  };

  const removeFile = (index) => {
    const updatedGallery = gallery.filter((_, i) => i !== index);
    setGallery(updatedGallery);
    handleFileChange({
      target: { name: eventName, files: updatedGallery.map((item) => item.file) },
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="gallery-uploader">
      <h5 className="gallery-uploader__title">{title ? title : "Gallery"}</h5>
      <div
        {...getRootProps({
          className: `dropzone ${isDragActive ? "drag-active" : ""}`,
        })}
      >
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop files here..." : "Drag and drop files here, or click to select files"}</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      {gallery.length > 0 && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="gallery" direction="horizontal">
            {(provided) => (
              <div
                className="gallery-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {gallery.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className={`gallery-item ${
                          index === 0 ? "profile-highlight" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.type === "image" || item.preview ? (
                          <img src={item.preview} alt={`Gallery item ${index}`} />
                        ) : (
                          <div className="video-placeholder">Video Unavailable</div>
                        )}
                        <button type="button" onClick={() => removeFile(index)}>
                          Remove
                        </button>
                        {index === 0 && (
                          <div className="profile-label">Profile Image</div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <p className="gallery-uploader__description">
        {
          description ? description
          : "Add more pictures and videos of this person's important moments."
        }
      </p>
      </div>
  );
};

export default GalleryUploader;
