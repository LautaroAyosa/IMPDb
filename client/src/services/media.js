import axios from 'axios';
const baseUrl = '/api/media';

const getAllProfile = async () => {
    const response = await axios.get(`${baseUrl}/getAllProfile/`);
    return response.data;
}

const getAllMedia = async () => {
    const response = await axios.get(`${baseUrl}/`);
    return response.data;
}

const getMediaOf = async (type, id) => {
    const response = await axios.get(`${baseUrl}/${type}/${id}/`);
    return response.data;
}

const uploadMedia = async (type, id, files) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('file', file);
    });

    const response = await axios.post(`${baseUrl}/${type}/${id}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
}

const setProfileImage = async (type, id, mediaId) => {
    const response = await axios.post(`${baseUrl}/${type}/${id}/setProfileImage`, { mediaId });
    return response.data;
}

const setMainTrailer = async (id, mediaId) => {
    const response = await axios.post(`${baseUrl}/movie/${id}/setMainTrailer`, { mediaId });
    return response.data;
}

const deleteMedia = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
}

// eslint-disable-next-line
export default { getAllProfile, getAllMedia, getMediaOf, uploadMedia, setProfileImage, setMainTrailer, deleteMedia };