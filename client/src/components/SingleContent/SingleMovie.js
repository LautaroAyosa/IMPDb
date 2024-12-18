import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeMovie } from '../../redux/reducers/moviesReducer'

const SingleMovie = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const movie = useSelector((state) => state.movies.find(movie => movie.id === parseInt(params.id)))
    
    const handleDelete = async (e) => {
        e.preventDefault()
        if (window.confirm(`Are you sure you want to remove "${movie.title}"?`)) {
          dispatch(removeMovie(movie))
          navigate('/movies')
        }
    }

    return (
        <div className='baseContainer'>
        {movie && 
            <div className='single_page-container'>
                <div className='single_page-banner'>
                    <div className='single_page-banner-image'>
                        <img src={movie.banner} alt="movie banner" />
                    </div>
                    <div className='single_page-banner-content'>
                        <h1 className='single_page-title'>{movie.title}</h1>
                        <div>
                            <button onClick={handleDelete} className='remove-button'>Delete movie</button>
                            <Link to={`/dashboard/edit-movie/${movie.id}`} className='secondary-button'>Edit movie</Link>
                        </div>
                    </div>
                </div>
                {
                    movie.description &&
                    <div className='single-description'>
                        <h2>Description</h2>
                        <p>{movie.description}</p>
                    </div>
                }
                <div className='single-people'>
                    <div>
                        <h2>Cast</h2>
                        <ul>
                            {movie.Cast.length !== 0 ? 
                                movie.Cast.map((actor, i) => {
                                    return <li key={i}><Link to={`/people/${actor.id}`}>{actor.name} {actor.lastName}</Link></li>
                                })
                            : 'No Cast have been added to this movie'
                            }
                        </ul>
                    </div>
                    <div>
                        <h2>Producers</h2>
                        <ul>
                            {movie.Producers.length !== 0 ? 
                                movie.Producers.map((producer, i) => {
                                    return <li key={i}><Link to={`/people/${producer.id}`}>{producer.name} {producer.lastName}</Link></li>
                                })
                            : 'No Producers have been added to this movie'
                            }
                        </ul>
                    </div>
                    <div>
                        <h2>Directors</h2>
                        <ul>
                            {movie.Directors.length !== 0 ? 
                                movie.Directors.map((director, i) => {
                                    return <li key={i}><Link to={`/people/${director.id}`}>{director.name} {director.lastName}</Link></li>
                                })
                            : 'No Directors have been added to this movie'
                            }
                        </ul>
                    </div>
                </div>
            </div>
        }
        </div>
    )
}

export default SingleMovie