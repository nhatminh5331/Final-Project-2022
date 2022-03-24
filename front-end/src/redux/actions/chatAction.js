export const CHAT_TYPES = {
    GET_INFO_USER: 'GET_INFO_USER'
}

export const getInfoUser = ({user, chatReducer}) => async (dispatch) => {
    if(chatReducer.users.every(item => item._id !== user._id)){
        dispatch({
            type: CHAT_TYPES.GET_INFO_USER,
            payload: user
        })
    }
} 