import { POST_TYPES } from '../actions/postAction'
import {EditData} from '../actions/globalTypes'

const initialState = {
    loading: false,
    posts: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type){
        case POST_TYPES.GET_POSTS:
            return {
                posts: [...action.payload],
            };
        case POST_TYPES.CREATE_POST:
			return {
                ...state,
				posts: [action.payload, ...state.posts],
			};
        case POST_TYPES.UPDATE_POSTS:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload),
            };
        default:
            return state;
    }
}

export default postReducer