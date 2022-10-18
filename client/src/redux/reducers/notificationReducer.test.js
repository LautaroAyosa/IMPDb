import notificationReducer from './notificationReducer.js'

describe('notificationReducer', () => {

  test('Adds new notification to state with correct message and type', () => {
    const state = null
    const action =  {
        type: '@notification/create',
        payload: {
            message: 'this is a new notification',
            type: 'success'
        }
    }

    const newState = notificationReducer(state, action)
    expect(newState).toEqual(action.payload)

  })

  // Test if the notification changes to null after 8000ms 
})