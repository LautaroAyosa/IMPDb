import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeMovie } from '../../redux/actions/moviesActions'
import Loading from '../../components/Loading/Loading'
import MediaGallery from '../../components/MediaGallery/MediaGallery';
import PostNavigation from '../../components/PostNavigation/PostNavigation';
import MovieParticipants from '../../components/SingleContent/MovieParticipants';


const SingleMovie = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const movies = useSelector((state) => state.movies.data)
    const movie = useSelector((state) => state.movies.data.find(movie => movie.id === parseInt(params.id)))
    const isLoading = useSelector((state) => state.movies.isLoading)
    
    const baseMediaUrl = 'https://res.cloudinary.com/dpsviovus/image/upload/ar_0.5944,c_fill,g_face,h_500/q_auto:eco/'

    const handleDelete = async (e) => {
        e.preventDefault()
        if (window.confirm(`Are you sure you want to remove "${movie.title}"?`)) {
          dispatch(removeMovie(movie))
          navigate('/movies')
        }
    }

    console.log(movie)
    return (
        <div className="base-container">
            {  isLoading ? <Loading /> : (
            <div className="single-movie">
                <div className="full-width-container">
                    <div className="single-movie__header">
                        <div className="single-movie__header-quickaccess">
                            <div>
                                <ul>
                                    { movie.Cast?.length !== 0 ? <li><a href="#Cast">Cast</a></li> : null}
                                    { movie.Producers?.length !== 0 ? <li><a href="#Producers">Producers</a></li> : null}
                                    { movie.Directors?.length !== 0 ? <li><a href="#Directors">Directors</a></li> : null}
                                </ul>
                            </div>
                            <div>
                                <a href="#gallery">Gallery</a>
                            </div>
                            <div>
                                <a href="#Share"><i className="fa-solid fa-share-nodes"></i></a>
                            </div>
                        </div>

                        <div className="single-movie__header-info">
                            <div className='single-movie-title'>
                                <h1>{movie?.title || "Untitled Movie"}</h1>
                                <div className='single-movie-title-extras'>
                                    <span>Release Year</span>
                                    <h5>{movie?.releaseDate ? new Date(movie.releaseDate).getFullYear() : "Unknown Release Date"}</h5>
                                </div>
                                <div className='single-movie-title-extras'>
                                    <span>Duration</span>
                                    <h5>{movie?.duration ? `${movie.duration} mins` : "Unknown Duration"}</h5>
                                </div>
                            </div>
                            <div className="single-movie-actions">
                                <button className="remove-button" onClick={handleDelete}>Delete Movie</button>
                                <Link to={`/dashboard/edit-movie/${movie?.id}`} className="secondary-button button">Edit Movie</Link>
                            </div>
                        </div>

                        <div className="single-movie__header-media">
                            <img 
                                src={`${baseMediaUrl}${movie?.MovieGallery?.[0]?.publicId || "placeholders/PLACEHOLDER_tqmib9"}`} 
                                alt={movie?.title || "Untitled"} 
                                className="single-movie-profileImage" 
                            />
                            
                            {movie?.MainTrailer?.url ? (
                                <video className="single_person-video" src={movie.MainTrailer.url} controls></video>
                            ) : (
                                <p>No trailers available for this movie.</p>
                            )}

                            <a className="gallery-container" href='#gallery'>
                                <i className="fa-regular fa-images"></i>
                                <div>
                                    <h4>Gallery</h4>
                                    <span>{movie?.MovieGallery?.length || 0} Images and Videos</span>
                                </div>
                            </a>
                        </div>

                        <div className="single-movie__header-tags">
                            {movie?.tags?.length > 0 ? (
                                movie.tags.map((tag, index) => (
                                    <div key={index} className="single-tag">
                                        {tag}
                                    </div>
                                ))
                            ) : (
                                <p>No tags available.</p>
                            )}
                        </div>

                        <div className="single-movie__header-extra">
                            <span>{movie?.synopsis || "No synopsis available."}</span>
                        </div>
                    </div>
                </div>
                
                <div className='single-movie__content'>
                    <div className="media-section" id='gallery'>
                        <MediaGallery media={movie?.MovieGallery} />
                    </div>
                    <MovieParticipants entity={movie} isMoviePage={true} />
                </div>

                <PostNavigation currentId={parseInt(params.id)} items={movies} type='movies' />

            </div>
            )}
        </div>
    );
};

export default SingleMovie;