export const CHAT_TYPES = {
    GET_INFO_USER: 'GET_INFO_USER',
    CREATE_MESSAGE: 'CREATE_MESSAGE',
}

export const getInfoUser = ({user, chatReducer}) => (dispatch) => {
    if(chatReducer.users.every(item => item._id !== user._id)){
        dispatch({
            type: CHAT_TYPES.GET_INFO_USER,
            payload: user
        })
    }
} 
export const createMessage = ({message, authReducer}) => async (dispatch) => {
    console.log(message)
    dispatch({
        type: CHAT_TYPES.CREATE_MESSAGE,
        payload: message
    })
}