import { POST_TYPES } from '../actions/postAction'

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
				posts: [...state.posts, action.payload],
			};
        default:
            return state;
    }
}

export default postReducer