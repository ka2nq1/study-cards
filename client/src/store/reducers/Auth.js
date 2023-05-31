const initialState = {
    requestState: '',
    id: null,
    username: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'START_LOAD_ACTION':
            return {...state, requestState: 'START_LOAD_ACTION'};
        case 'SUCCESS_LOAD_ACTION':
            return {...state, requestState: ''};
        default:
            return state;
    }
};

export default authReducer;