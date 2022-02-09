import {GLOBALTYPES} from './globalTypes'
import {postDataAPI} from '../../utils/fetchData'
import valid from '../../utils/valid'

export const login = (data) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.NOTIFY,payload: {loading: true} })
        const res = await postDataAPI('login', data);
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token, 
                userCurrent: res.data.user
            } 
        })

        localStorage.setItem("firstlogin", true);
        dispatch({ 
            type: GLOBALTYPES.NOTIFY, 
            payload: {
                success: res.data.msg
            } 
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

export const refreshToken = () => async (dispatch) => {
    const firstLogin = localStorage.getItem("firstlogin")
    if(firstLogin){
            dispatch({ type: GLOBALTYPES.NOTIFY, payload: {loading: true}})

            try {
                const res = await postDataAPI('refresh_token')
                dispatch({ 
                    type: GLOBALTYPES.AUTH, 
                    payload: {
                        token: res.data.access_token, 
                        userCurrent: res.data.user
                    } 
                })

                dispatch({ type: GLOBALTYPES.NOTIFY, payload: {}})

            } catch (err) {
                dispatch({ 
                    type: GLOBALTYPES.NOTIFY, 
                    payload: {
                        error: err.response.data.msg
                    } 
                })
            }
    }
}

export const register = (data) => async (dispatch) => {
    const check = valid(data);
        if(check.errLength > 0)
        return dispatch({type: GLOBALTYPES.NOTIFY, payload: check.errMsg})

    try {
        dispatch({type: GLOBALTYPES.NOTIFY, payload: {loading: true}})
        
        const res = await postDataAPI('register', data)
        dispatch({ 
            type: GLOBALTYPES.AUTH, 
            payload: {
                token: res.data.access_token, 
                userCurrent: res.data.user
            } 
        })

        localStorage.setItem("firstlogin", true);
        dispatch({ 
            type: GLOBALTYPES.NOTIFY, 
            payload: {
                success: res.data.msg
            } 
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

export const forgotPassword = (data) => async (dispatch) => {

    try {
        dispatch({type: GLOBALTYPES.NOTIFY, payload: {loading: true}})
        const res = await postDataAPI('forgot', data)

        dispatch({ 
            type: GLOBALTYPES.NOTIFY, 
            payload: {
                success: res.data.msg
            } 
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






