const initialState = [];

export default function users(state = initialState, action) {
    if(action.type === 'ADD_USER') {
        return [
            ...state,
            action.payload
        ];
    } else if (action.type === 'DELETE_USER'){
        return [...state.filter(user => user.email !== state[action.payload].email)]
    } else if (action.type === 'UPDATE_USER'){       
        return [
            ...state.slice(0, action.payload.index),
            action.payload.user,
            ...state.slice(action.payload.index+1)
        ];
    } else if (action.type === 'RECEIVE_USERS'){
        return action.payload;
    }

    return state;
}