const notificationReducer = (state = null, action) => {
  switch (action.type) {
      case '@notification/create':
          return action.payload
      default:
          return state
  }
}


let timeoutId = null;

export const createNotification = (message, type) => {
  return async (dispatch) => {
    dispatch({
      type: '@notification/create',
      payload: {
        message: message,
        type: type
      }
    })

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => dispatch({
      type: '@notification/create',
      payload: null
    }), 8000);
  }
}

export default notificationReducer