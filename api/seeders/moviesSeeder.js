const axios = require('axios');
const fs = require('fs');

const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your actual backend URL
const MOVIES_JSON_PATH = 'movies.json';

async function seedMovies() {
    try {
        const moviesData = JSON.parse(fs.readFileSync(MOVIES_JSON_PATH, 'utf-8'));
        
        for (const movie of moviesData) {
            try {
                // Post movie data to backend
                const movieResponse = await axios.post(`${API_BASE_URL}/movies/`, {
                    title: movie.title,
                    synopsis: movie.synopsis,
                    releaseDate: movie.releaseDate,
                    tags: movie.tags,
                    duration: movie.duration
                });

                const movieId = movieResponse.data.id;
                console.log(`Movie added: ${movie.title} (ID: ${movieId})`);

                // Upload each image in MovieGallery
                for (const media of movie.MovieGallery) {
                    try {
                        await axios.post(`${API_BASE_URL}/media/movie/${movieId}`, {
                            path: media.path,
                            relativePath: media.relativePath
                        });
                        console.log(`Media added for movie ID ${movieId}: ${media.path}`);
                    } catch (mediaError) {
                        console.error(`Error uploading media for ${movie.title}:`, mediaError.message);
                    }
                }
            } catch (movieError) {
                console.error(`Error uploading movie ${movie.title}:`, movieError.message);
            }
        }

        console.log('Seeding completed.');
    } catch (error) {
        console.error('Error reading movies.json:', error.message);
    }
}

seedMovies();
