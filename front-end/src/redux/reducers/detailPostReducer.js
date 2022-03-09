import { POST_TYPES } from '../actions/postAction'
import { EditData } from '../actions/globalTypes'

const detailPostReducer = (state = [], action) => {
        switch (action.type) {
            case POST_TYPES.GET_POST:
                return [...state, action.payload]
            default:
                return state;
        }
}

export default detailPostReducer