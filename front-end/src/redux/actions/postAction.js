import {GLOBALTYPES} from './globalTypes'
import {uploadImage} from '../../utils/uploadImage'
import {getDataAPI, postDataAPI, patchDataAPI, deleteDataAPI} from '../../utils/fetchData'

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

export const updatePost = ({postData, images, authReducer, statusReducer}) => async (dispatch) => {
    let media = []
    
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)
 
    if(statusReducer.title === postData.title
       && imgNewUrl.length === 0
       && imgOldUrl.length === statusReducer.images.length 
    ) 
    return;

    try {
        if(imgNewUrl.length > 0) media = await uploadImage(imgNewUrl)

        const res = await patchDataAPI(`post/${statusReducer._id}`,{
            ...postData, images: [...imgOldUrl,...media]}, authReducer.token);
        
        dispatch({ 
            type: POST_TYPES.UPDATE_POST, 
            payload: res.data.updatePost
        })

        dispatch({ 
            type: GLOBALTYPES.NOTIFY, 
            payload: {
                success: res.data.msg
            } 
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

export const deletePost = ({post, authReducer}) => async (dispatch) => {
    dispatch({type: POST_TYPES.DELETE_POST, payload: post})
    try {
        
        deleteDataAPI(`post/${post._id}`, authReducer.token)

    } catch (err) {
        dispatch({ 
            type: GLOBALTYPES.NOTIFY, 
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}


