import {GLOBALTYPES} from './globalTypes'
import {getDataAPI} from '../../utils/fetchData'
import {postDataAPI} from '../../utils/fetchData'
// import {patchDataAPI} from '../../utils/fetchData'
// import {deleteDataAPI} from '../../utils/fetchData'

export const POST_TYPES = {
    GET_POSTS: "GET_POSTS",
    CREATE_POST: "CREATE_POST",
    UPDATE_POST: "UPDATE_POST",
    DELETE_POST: "DELETE_POST",
    GET_POST: "GET_POST",
}

export const createPost = (data) => async (dispatch) => {
    try {
        dispatch({type: GLOBALTYPES.NOTIFY,payload: {loading: true}})
        const res = await postDataAPI('posts', data);
        dispatch({ 
            type: GLOBALTYPES.NOTIFY, 
            payload: {
                success: res.data.msg
            } 
        });
        dispatch({ 
            type: POST_TYPES.CREATE_POST, 
            payload: res.data.newPost
        
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
export const getPosts = () => async (dispatch) => {
    try {
        const res = await getDataAPI('posts');
        dispatch({ 
            type: POST_TYPES.GET_POSTS, 
            payload: res.data.posts
        });
    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}
// export const updatePost = (data) => async (dispatch) => {
//     try {
//         dispatch({type: GLOBALTYPES.NOTIFY,payload: {loading: true}})
//         const res = await patchDataAPI('posts', data);
//         dispatch({ 
//             type: GLOBALTYPES.NOTIFY, 
//             payload: {
//                 success: res.data.msg
//             } 
//         });
//         dispatch({ 
//             type: POST_TYPES.UPDATE_POST, 
//             payload: res.data.newPost
        
//         })
//     } catch (err) {
//         dispatch({ 
//             type: GLOBALTYPES.NOTIFY, 
//             payload: {
//                 error: err.response.data.msg
//             } 
//         })
//     }
// }


