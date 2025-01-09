import personService from '../../services/persons'
import mediaService from '../../services/media'
import { createNotification } from '../reducers/notificationReducer'


// Set loading
export const setLoading = (bool) => {
    return {
      type: '@persons/set_loading',
      payload: bool
    };
};

export const initPersons = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const persons = await personService.getAll();
            dispatch({
                type: '@persons/init',
                payload: persons
            })
            dispatch(setLoading(false))
        }
        catch (error) {
            dispatch({ type: '@persons/error', payload: error.message });
            dispatch(setLoading(false));
            dispatch(createNotification(error.response.data.error, 'error'))
        }
    }
}

export const createPerson = (person) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            // Create new Person
            let addedPerson = await personService.create(person)
            
            if ( person.gallery.length !== 0 ) {
                // If images ARE provided, upload them and dispatch the new person
                // with their images to redux and notify the success
                
                // Upload media
                let addedMedia = await mediaService.uploadMedia('person', addedPerson.id, person.gallery)
                await mediaService.setProfileImage('person', addedPerson.id, addedMedia.uploadedMedia[0].id)
                // Get new person with their data.
                addedPerson = await personService.getOne(addedPerson.id)
            } 
            dispatch( {
                type: '@persons/new_person',
                payload: addedPerson
            })
            dispatch(createNotification(
                `New person "${addedPerson.name}" added successfuly!`,
                'success'
            ))
            dispatch(setLoading(false))
        } catch (error) {
            console.log(error)
            dispatch(createNotification(error.response.data.error, 'error'))
            dispatch(setLoading(false))
        }
    } 
}

export const updatePerson = (id, personToUpdate) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const updatedPerson = await personService.update(id, personToUpdate)
            dispatch({
                type: '@persons/update_person',
                payload: {id: id, person: updatedPerson}
            })
            dispatch(createNotification(`${updatedPerson.name} ${updatedPerson.lastName} updated successfuly`, 'success'))
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
            dispatch(setLoading(false))
        }
    }
}

export const removePerson = (person) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            await personService.remove(person.id)
            dispatch ({
                type: '@persons/remove_person',
                payload: person.id
            })
            dispatch(createNotification(
                `${person.name} ${person.lastName} removed successfuly!`,
               'success'
            ))
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(createNotification(error.response.data.error, 'error'))
            dispatch(setLoading(false))
        }
    }
}