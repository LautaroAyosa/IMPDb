const initialState = {
    data: [],
    isLoading: false,
    error: null
};

const personsReducer = (state = initialState, action) => {
    switch (action.type) {
        case '@persons/set_loading':
            return {
                ...state,
                isLoading: action.payload
            }
        case '@persons/init':
            return {
                ...state,
                data: action.payload
            }
        case '@persons/new_person':
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case '@persons/update_person':
            const updatedperson = action.payload.person
            return {
                ...state,
                data: state.data.map((p) =>
                  p.id !== action.payload.id ? p : updatedperson
                )
              };
        case '@persons/remove_person':
            return {
                ...state,
                data: state.data.filter((p) => p.id !== action.payload)
            };
        default:
            return state
    }
}

export default personsReducer