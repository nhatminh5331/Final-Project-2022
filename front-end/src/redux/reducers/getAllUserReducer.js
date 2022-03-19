import { PROFILE_TYPES } from '../actions/profileAction'

const initialState = {
    users: [],
}

const allUserReducer = (state = initialState, action) => {
    switch(action.type){
        case PROFILE_TYPES.GET_ALL_USER:
            return action.payload
        default:
            return state
    }
}

export default allUserReducer