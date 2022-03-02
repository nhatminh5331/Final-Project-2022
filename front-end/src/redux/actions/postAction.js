import {GLOBALTYPES} from './globalTypes'
import {uploadImage} from '../../utils/uploadImage'
import {getDataAPI} from '../../utils/fetchData'
import {postDataAPI} from '../../utils/fetchData'
import {patchDataAPI} from '../../utils/fetchData'
import {deleteDataAPI} from '../../utils/fetchData'

export const POST_TYPES = {
    CREATE_POST: "CREATE_POST",
    GET_POSTS: "GET_POSTS",
    UPDATE_POST: "UPDATE_POST",
    DELETE_POST: "DELETE_POST",
    GET_POST: "GET_POST",
}

export const createPost = ({postData, images, authReducer}) => async (dispatch) => {

    let media = []
    try {
        dispatch({type: GLOBALTYPES.NOTIFY,payload: {loading: true}})
        if(images.length > 0) media = await uploadImage(images)

        const res = await postDataAPI('posts', {...postData, images: media}, authReducer.token)
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


