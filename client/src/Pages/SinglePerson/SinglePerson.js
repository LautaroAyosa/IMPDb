import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removePerson } from '../../redux/actions/personsActions'
import BiographySection from '../../components/SingleContent/BiographySection'
import Loading from '../../components/Loading/Loading'
import PostNavigation from '../../components/PostNavigation/PostNavigation'
import MediaGallery from '../../components/MediaGallery/MediaGallery'
import PersonRelations from '../../components/SingleContent/PersonRelations'
import MovieParticipants from '../../components/SingleContent/MovieParticipants'


const SingleMovie = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const person = useSelector((state) => state.persons.data.find(person => person.id === parseInt(params.id)))
    const persons = useSelector((state) => state.persons.data)
    const isLoading = useSelector((state) => state.persons.isLoading)

    const baseMediaUrl = 'https://res.cloudinary.com/dpsviovus/image/upload/t_MoviePoster-Optimized/'


    const handleDelete = async (e) => {
        e.preventDefault()
        if (window.confirm(`Are you sure you want to remove "${person.name} ${person.lastName}"?`)) {
          dispatch(removePerson(person))
          navigate('/people')
        }
    }


    return (
        <div className='base-container'>
            { isLoading ? <Loading /> : 
            person &&
            <div className='single-person'>
                <div className="full-width-container">
                    <div className="single-person__header">
                        <div className="single-person__header-quickaccess">
                            <div>
                                <ul>
                                    { person.ActedIn?.length !== 0 ? <li><a href="#Cast">Acted</a></li> : null}
                                    { person.Produced?.length !== 0 ? <li><a href="#Producers">Produced</a></li> : null}
                                    { person.Directed?.length !== 0 ? <li><a href="#Directors">Directed</a></li> : null}
                                </ul>
                            </div>
                            <div>
                                <a href="#gallery">Gallery</a>
                            </div>
                            <div>
                                <a href="#Share"><i className="fa-solid fa-share-nodes"></i></a>
                            </div>
                        </div>
                        <div className='single-person__header-info'>
                            <div>
                                <h1>{person.name}</h1>
                                <ul className='roles'>
                                    { person.ActedIn?.length !== 0 ? <li>Actor</li> : null}
                                    { person.Produced?.length !== 0 ? <li>Producer</li> : null}
                                    { person.Directed?.length !== 0 ? <li>Director</li> : null}
                                </ul>
                            </div>
                            <div className='single-person-actions'>
                                <button className='remove-button' onClick={handleDelete}>Delete person</button>
                                <Link to={`/dashboard/edit-person/${person.id}`} className='secondary-button button'>Edit person</Link>
                            </div>
                        </div>
                        <div className='single-person__header-media'>
                            <img src={`${baseMediaUrl}${person.ProfileImage?.publicId || 'placeholders/PLACEHOLDER_tqmib9' }`} alt={`${person.name}`} className='single-person-profileImage' />
                            {/* { latestMovie ? <video className='single_person-video' src={latestMovie.trailer} controls></video> : <div><p>No movies available for this person.</p>;</div> } */}
                            <a className="gallery-container" href='#gallery'>
                                <i className="fa-regular fa-images"></i>
                                <div>
                                    <h4>Gallery</h4>
                                    <span>{person.PersonGallery.length + 1 || 0} Images and Videos</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="single-person__content">
                    <div className='single-person__content-personal-details'>
                        <div className='header'>
                            <h2>Personal Details</h2>
                            <a href="#" className="add-photo">+ Edit Information</a>
                        </div>
                        <div className='personal-details'>
                            <div className='biography'>
                                <BiographySection person={person}/>
                            </div>
                            <div className='extras'>
                                <div>
                                    <span>Alternative Name</span>
                                    <h5>{person.personalDetails.alternativeName}</h5>
                                </div>
                                <div>
                                    <span>Birth Date</span>
                                    <h5>{person.personalDetails.born.date}</h5>
                                </div>
                                <div>
                                    <span>Birth Place</span>
                                    <h5>{person.personalDetails.born.place}</h5>
                                </div>
                                <div>
                                    <span>Height</span>
                                    <h5>{person.personalDetails.height}<span>cm</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <div className='single-person__content-media'>
                        <MediaGallery media={person.PersonGallery} />
                    </div>
                    <div className="section participated">
                        <MovieParticipants entity={person} isMoviePage={false} />
                    </div>
                    
                    <div className='single-person__content-family'>
                        <div className='header'>
                            <h2>Family Members <span>{person?.Parents?.length + person?.Children?.length + person?.Relatives?.length + person?.Spouses?.length}</span></h2>
                            <a href='#' className='add-photo'>+ Edit Information</a>
                        </div>
                        <div className='family'>
                            <PersonRelations person={person} />
                        </div>
                    </div>
                </div>
                <div>
                    <PostNavigation currentId={parseInt(params.id)} items={persons} type='people' />
                </div>
            </div>
            }
        </div>
    )
}

export default SingleMovie