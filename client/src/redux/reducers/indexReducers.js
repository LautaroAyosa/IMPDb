import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer';
import personsReducer from './personsReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
    movies: moviesReducer,
    persons: personsReducer,
    notification: notificationReducer,
});

export default rootReducer;
