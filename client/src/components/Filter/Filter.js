import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/reducers/filterReducer';

const Filter = (props) => {
    const filter = useSelector( state => state.filter)
    const dispatch = useDispatch()

    const handleFilterChange = (e) => {
        dispatch(setFilter(e.target.value))
    }

    return (
        <div className='filterContainer'>
            <input className='filter' onChange={handleFilterChange} value={filter} name='filter' placeholder={props.placeholder ? props.placeholder : 'Search Movies and more' } />
        </div>
    )
}

export default Filter;