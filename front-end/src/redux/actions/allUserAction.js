import { getDataAPI } from '../../utils/fetchData'
import { GLOBALTYPES } from './globalTypes'
import { PROFILE_TYPES } from './profileAction'

export const getAllUser = (authReducer) => async (dispatch) => {
    const res = await getDataAPI('all_user', authReducer.token)

    try {
        dispatch({
            type: PROFILE_TYPES.GET_ALL_USER,
            payload: res.data
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