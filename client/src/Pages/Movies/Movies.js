import { useSelector } from 'react-redux'
import ListMovies from '../../components/List/ListMovies'
import Loading from '../../components/Loading/Loading';

const People = () => {
    const { data, isLoading, error } = useSelector((state) => state.movies);

    return (
        <div className='base-container'>
            <h1>Movies</h1>
            {isLoading ? <Loading /> : error ? <div>{error}</div> : 
            <div className='list-wrapper'>
                <ListMovies dataset={data} />
            </div>
            }
        </div>
    )
}

export default People