import { useSelector } from 'react-redux'
import Card from './Card/Card';

const List = (props) => {

    const content = useSelector(state => {
        if (props.show === 'people') {
            return state.persons
        } else {
            return state.movies
        }
    })

    return (
        <div>
            <h1>{props.show === 'people' ? 'People' : 'Movies'}</h1>
            <div className='list_container'>       
                {
                    content !== 0 ? content.map((content, i) => (
                        <Card 
                            key={i} 
                            content={content}
                            show={props.show}
                        />
                    )) :
                    <p>No data found for that search</p>
                }
            </div>
        </div>
    )
}

export default List