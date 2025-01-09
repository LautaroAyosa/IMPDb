const mediaRouter = require('express').Router()
const mediaController = require('../controllers/media') 
const upload = require('../utils/multer')

mediaRouter.get('/', mediaController.getAllMedia)
mediaRouter.get('/getAllProfile', mediaController.getAllProfile)
mediaRouter.get('/:type/:id/', mediaController.getMediaOf)
mediaRouter.post('/:type/:id/upload', upload.array('file', 10), mediaController.uploadMedia)
mediaRouter.post('/:type/:id/setProfileImage', mediaController.setProfileImage)
mediaRouter.post('/movie/:id/setMainTrailer', mediaController.setMainTrailer)
mediaRouter.delete('/:id/', mediaController.deleteMedia)

module.exports = mediaRouter