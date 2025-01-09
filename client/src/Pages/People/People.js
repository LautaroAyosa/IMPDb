import { useSelector } from 'react-redux'
import List from '../../components/List/List'
import Loading from '../../components/Loading/Loading'

const People = () => {
    const { data, isLoading, error } = useSelector(state => {return state.persons})
    return (
        <div className='base-container'>
            <h1>People</h1>
            {isLoading ? <Loading /> : error ? <div>{error}</div> :
            <div className='list-wrapper'>
                <List dataset={data} />
            </div>
            }
        </div>
        
    )
}

export default People