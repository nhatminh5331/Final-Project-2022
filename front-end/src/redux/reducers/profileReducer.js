import { PROFILE_TYPES } from '../actions/profileAction'

const initialState = {
    loading: false,
    users: [],
    allposts: [],
    ids: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case PROFILE_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case PROFILE_TYPES.GET_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            };
        case PROFILE_TYPES.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            };     
        case PROFILE_TYPES.GET_POSTS:
            return {
                ...state,
                allposts: [...state.allposts, action.payload]
            };     
        default:
            return state;
    }
}

export default profileReducer