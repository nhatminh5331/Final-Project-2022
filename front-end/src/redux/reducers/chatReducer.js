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
        case CHAT_TYPES.CREATE_MESSAGE:
            return{
                ...state,
                data: [...state.data, action.payload],
                users: state.users.map(user => 
                    user._id === action.payload.recipient || user.id === action.payload.sender
                    ? {...user, text: action.payload.text}
                    : user
                )
            };
        case CHAT_TYPES.GET_USER_CONVERSATION:
                return{
                    ...state,
                    users: action.payload.newArr,
                    resultUsers: action.payload.result
                };
        default:
            return state;
    }
}

export default chatReducer