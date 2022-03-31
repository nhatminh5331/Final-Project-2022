import { GLOBALTYPES } from './globalTypes'
import { postDataAPI, getDataAPI } from '../../utils/fetchData'

export const CHAT_TYPES = {
    GET_INFO_USER: 'GET_INFO_USER',
    CREATE_MESSAGE: 'CREATE_MESSAGE',
    GET_USER_CONVERSATION: 'GET_USER_CONVERSATION'
}

export const getInfoUser = ({user, chatReducer}) => (dispatch) => {
    if(chatReducer.users.every(item => item._id !== user._id)){
        dispatch({
            type: CHAT_TYPES.GET_INFO_USER,
            payload: user
        })
    }
} 
export const createChat = ({message, authReducer}) => async (dispatch) => {
    dispatch({
        type: CHAT_TYPES.CREATE_MESSAGE,
        payload: message
    })
    
    try {
        await postDataAPI('chat', message, authReducer.token)

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            }
        })
    }
}
export const getUserConversation = ({authReducer}) => async (dispatch) => {
    try {
        const res = await getDataAPI('conversation', authReducer.token)

        let newArr = []

        res.data.conversation.forEach(item => {
            item.recipients.forEach(info => {
                if(info.id !== authReducer.userCurrent._id){
                    newArr.push({...info, text: item.text})
                }
            })
        })

        dispatch({
            type: CHAT_TYPES.GET_USER_CONVERSATION,
            payload: {newArr, result: res.data.result}
        })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            }
        })
    }
}
export const getChat = ({}) => async (dispatch) => {

}