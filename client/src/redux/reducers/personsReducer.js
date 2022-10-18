import personService from '../../services/persons'
import { createNotification } from './notificationReducer'

const personsReducer = (state = [], action) => {
    switch (action.type) {
        case '@persons/init':
            return action.payload
        case '@persons/new_person':
            return [...state, action.payload]
        case '@persons/update_person':
            const updatedperson = action.payload.person
            return state.map(person => (person.id !== action.payload.id ? person : updatedperson))
        case '@persons/add_like':
            console.log(action.payload)
            return state.map(person => (person.id !== action.payload.id ? person.likes: action.payload.likes))
        case '@persons/remove_person':
            return state.filter((person) => person.id !== action.payload)
        default:
            return state
    }
}

export const initPersons = () => {
    return async (dispatch) => {
        const persons = await personService.getAll()        
        dispatch({
            type: '@persons/init',
            payload: persons
        })
    }
}

export const createPerson = (person) => {
    return async (dispatch) => {
        try {
            await personService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
            const addedperson = await personService.createperson(person)
            dispatch( {
                type: '@persons/new_person',
                payload: addedperson
            })
            dispatch(createNotification(
                `New person "${addedperson.title}" by ${addedperson.author} added successfuly!`,
                'success'
            ))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    } 
}

export const updatePerson = (id, personToUpdate) => {
    return async (dispatch) => {
        try {
            await personService.setToken(JSON.parse(window.localStorage.getItem('loggedUser')).token)
            const updatedperson = await personService.update(id, personToUpdate)
            dispatch({
                type: '@persons/update_person',
                payload: {id: id, person: updatedperson}
            })
            dispatch(createNotification(`${updatedperson.title} updated successfuly`, 'success'))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    }
}

export const removePerson = (person) => {
    return async (dispatch) => {
        try {
            await personService.remove(person.id)
            dispatch ({
                type: '@persons/remove_person',
                payload: person.id
            })
            dispatch(createNotification(
                `${person.title} by ${person.author} removed successfuly!`,
               'success'
            ))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    }
}

export default personsReducer