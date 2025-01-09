const { Media, Person, Movie } = require('../models'); 
const { upload } = require('../utils/multer');

const getAllMedia = async (req, res) => {
    try {
        const media = await Media.findAll();
        res.status(200).json(media);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error fetching media' });
    }
}

const getMediaOf = async (req, res) => {
    try {
        const { type, id } = req.params;
        if ( !['person', 'movie'].includes(type) ) {
            return res.status(400).json({ error: 'Invalid type. Use "person" or "movie".' });
        }

        const referenceType = type === 'person' ? 'Person' : 'Movie';

        const gallery = await Media.findAll({
            where: { referenceType, referenceId: id }
        });

        res.status(200).json(gallery);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error fetching gallery' });
    }
}

const getAllProfile = async (req, res) => {
    try {
        const { type } = req.params;
        if ( !['person', 'movie'].includes(type) ) {
            return res.status(400).json({ error: 'Invalid type. Use "person" or "movie".' });
        }

        const referenceType = type === 'person' ? 'Person' : 'Movie';

        const profileImages = await Media.findOne({
            where: { referenceType, isProfileImage: true }
        });

        res.status(200).json(profileImages);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error fetching profile images' });
    }
}


const uploadMedia = async (req, res) => {
    try {
        const { type, id } = req.params;

        if ( !['person', 'movie'].includes(type) ) {
            return res.status(400).json({ error: 'Invalid type. Use "person" or "movie".' });
        }

        const referenceType = type === 'person' ? 'Person' : 'Movie';

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded.' });
        }

        // Save the media record
        const uploadedMedia = [];
        for (const file of req.files) {
            const media = await Media.create({
                type: file.mimetype.startsWith('video') ? 'video' : 'image',
                url: file.path, // Cloudinary URL
                publicId: file.filename, // Cloudinary PublicId
                referenceType,
                referenceId: id,
            });
        uploadedMedia.push(media);
        }


        res.status(201).json({message: 'Media uploaded successfully', uploadedMedia});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error uploading media' });
    }
}

const setProfileImage = async (req, res) => {
    try {
        const {type, id} = req.params;
        const {mediaId} = req.body;

        if (!['person', 'movie'].includes(type)) {
            return res.status(400).json({error: 'Invalid type. Use "person" or "movie".'});
        }

        const referenceType = type === 'person' ? 'Person' : 'Movie';

        // Check if the media exists
        const media = await Media.findOne({
            where: {id: mediaId, referenceType, referenceId: id}
        });
        if (!media) {
            return res.status(404).json({error: 'Media not found'});
        } else if (media.dataValues.type !== 'image') {
            return res.status(400).json({error: 'Only images can be set as profile Images'});
        }

        // Unset the current profile media
        await Media.update(
            {isProfileImage: false},
            {where: {referenceType, referenceId: id}}
        );

        // Set the new profile media
        await Media.update(
            {isProfileImage: true},
            {where: {id: mediaId, referenceType, referenceId: id}}
        );

        res.status(200).json({message: 'Profile media set successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error setting profile media'});
    }
}

const setMainTrailer = async (req, res) => {
    try {
        const {id} = req.params;
        const {mediaId} = req.body;

        // Check if the media exists
        const media = await Media.findOne({
            where: {id: mediaId, referenceType: 'Movie', referenceId: id}
        });
        if (!media) {
            return res.status(404).json({error: 'Media not found'});
        } else if (media.dataValues.type !== 'video') {
            return res.status(400).json({error: 'Only videos can be set as main trailers'});
        }

        // Unset the current main trailer
        await Media.update(
            {isMainTrailer: false},
            {where: {referenceType: 'Movie', referenceId: id}}
        );

        // Set the new main trailer
        await Media.update(
            {isMainTrailer: true},
            {where: {id: mediaId, referenceType: 'Movie', referenceId: id}}
        );

        res.status(200).json({message: 'Main trailer set successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error setting main trailer'});
    }
}

const deleteMedia = async (req, res) => {
    try {
        const {mediaId} = req.params;

        // Check if the media exists
        const media = await Media.findByPk(mediaId);
        if (!media) {
            return res.status(404).json({error: 'Media not found'});
        }

        // Delete Image in Cloudinary
        await cloudinary.uploader.destroy(media.publicId);

        // Delete Media
        await Media.destroy({ where: { id: mediaId } });

        res.status(200).json({message: 'Media deleted successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error deleting media'});
    }
}

module.exports = {
    getAllMedia,
    getMediaOf,
    getAllProfile,
    uploadMedia,
    setProfileImage,
    setMainTrailer,
    deleteMedia
};