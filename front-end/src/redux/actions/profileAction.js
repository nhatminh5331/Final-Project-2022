import { GLOBALTYPES } from './globalTypes'
import { getDataAPI } from '../../utils/fetchData'
import { patchDataAPI } from '../../utils/fetchData'
import {uploadImage} from '../../utils/uploadImage'

export const PROFILE_TYPES = {
    LOADING: 'LOADING_PROFILE',
    GET_USER: 'GET_PROFILE_USER',
    GET_ID: 'GET_PROFILE_ID',
    GET_POSTS: 'GET_PROFILE_POSTS',
    UPDATE_POST: 'UPDATE_PROFILE_POST'
}

export const getProfileUsers = ({users, id, authReducer}) => async (dispatch) =>{

    if(users.every(user => user._id !== id)){

        try { 
            dispatch({type: PROFILE_TYPES.LOADING, payload: true})
            const res = await getDataAPI(`/user/${id}`, authReducer.token)
            dispatch({
                type: PROFILE_TYPES.GET_USER,
                payload: res.data
            })
            dispatch({type: PROFILE_TYPES.LOADING, payload: false})
            
        } catch(err){
            dispatch({
                type: GLOBALTYPES.NOTIFY, 
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}


export const updateProfileUser = ({userData, avatar, authReducer}) => async (dispatch) => {
    if(!userData.fullname)
    return dispatch({type: GLOBALTYPES.NOTIFY, payload: {error: "Please add your full name."}})

    if(userData.username.length > 12)
    return dispatch({type: GLOBALTYPES.NOTIFY, payload: {error: "Your username too long."}})

    if(userData.story.length > 150)
    return dispatch({type: GLOBALTYPES.NOTIFY, payload: {error: "Your story too long."}})

    try {
        let media; 

        if(avatar) media = await uploadImage([avatar])

        const res = await patchDataAPI("user", {
            ...userData,
            avatar: avatar ? media[0].url : authReducer.userCurrent.avatar
        }, authReducer.token)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...authReducer,
                user: {
                    ...authReducer.userCurrent,
                    ...userData,
                    avatar: avatar ? media[0].url : authReducer.userCurrent.avatar,
                }
            }
        })

        dispatch({type: GLOBALTYPES.NOTIFY, payload: {success: res.data.msg}})
    } catch (err) {
        dispatch({
                type: GLOBALTYPES.NOTIFY, 
                payload: {
                    error: err.response.data.msg
                }
            })
    }
}