import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removePerson } from '../../redux/reducers/personsReducer'

const SingleMovie = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const person = useSelector((state) => state.persons.find(person => person.id === parseInt(params.id)))
    
    const handleDelete = async (e) => {
        e.preventDefault()
        if (window.confirm(`Are you sure you want to remove "${person.name} ${person.lastName}"?`)) {
          dispatch(removePerson(person))
          navigate('/people')
        }
    }

    console.log(person)

    return (
        <div>
            <h1>{person.name} {person.lastName}</h1>
            <div>
                <button onClick={handleDelete}>Delete person</button>
            </div>
            <div>
                <div>
                    <h2>Acted in</h2>
                    <ul>
                        {person.ActedIn.length !== 0 ? 
                            person.ActedIn.map((movie, i) => {
                                return <li key={i}><Link to={`/movies/${movie.id}`}>{movie.title} - {movie.year}</Link></li>
                            })
                        : 'No Cast have been added to this movie'
                        }
                    </ul>
                </div>
                
                <div>
                    <h2>Produced</h2>
                    <ul>
                        {person.Produced.length !== 0 ? 
                            person.Produced.map((movie, i) => {
                                return <li key={i}><Link to={`/movies/${movie.id}`}>{movie.title} - {movie.year}</Link></li>
                            })
                        : "This person did't produce any movies"
                        }
                    </ul>
                </div> 

                <div>
                    <h2>Directed</h2>
                    <ul>
                        {person.Directed.length !== 0 ? 
                            person.Directed.map((movie, i) => {
                                return <li key={i}><Link to={`/movies/${movie.id}`}>{movie.title} - {movie.year}</Link></li>
                            })
                        : "This person did't directed any movies"
                        }
                    </ul>
                </div>
                
            </div>
        </div>
    )
}

export default SingleMovie