const filterReducer = (state = '', action) => {
  switch (action.type) {
      case '@filter/set':
        return action.payload
      default:
        return state
  }
}

export const setFilter = (text) => {
  return async (dispatch) => {
    dispatch({
      type: '@filter/set',
      payload: text
    })
  }
}

export default filterReducer