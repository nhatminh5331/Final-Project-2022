import { GLOBALTYPES } from './globalTypes'
import { getDataAPI } from '../../utils/fetchData'

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