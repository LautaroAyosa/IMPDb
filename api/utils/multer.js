const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');


// Configura el almacenamiento de Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'multimedia', // Carpeta en Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4'], // Formatos permitidos
    resource_type: 'auto', // Automatically handle both images and videos
  },
});

const upload = multer({
    storage,
    limits: {
      fileSize: 500 * 1024 * 1024, // 500MB
    },
});

module.exports = upload;
