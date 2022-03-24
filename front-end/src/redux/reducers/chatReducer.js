import { CHAT_TYPES } from "../actions/chatAction";

const initialState = {
    users: [],
    resultUsers: 0,
    data: [],
    resultData: 0,
    firstLoad: false,
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHAT_TYPES.GET_INFO_USER:
            return{
                ...state,
                users: [action.payload, ...state.users]
            };
        default:
            return state;
    }
}

export default chatReducer