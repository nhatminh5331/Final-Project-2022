import { POST_TYPES } from '../actions/postAction'
import {EditData, DeleteData} from '../actions/globalTypes'

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
        case POST_TYPES.UPDATE_POST:
            return {
                ...state,
                posts: EditData(state.posts, action.payload._id, action.payload),
            };
        case POST_TYPES.DELETE_POST:
            return {
                ...state,
                posts: DeleteData(state.posts, action.payload._id),
            };
        default:
            return state;
    }
}

export default postReducer