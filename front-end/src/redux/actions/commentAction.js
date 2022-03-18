import { GLOBALTYPES, EditData } from './globalTypes'
import { POST_TYPES } from './postAction'
import { postDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'

export const createComment = ({post, newComment, authReducer}) => async (dispatch) => {
        
        try {
            const data = {...newComment, postId: post._id, postUserId: post.user._id}
            const res = await postDataAPI('comment', data, authReducer.token)

            const newData = {...res.data.newComment, user: authReducer.userCurrent}
            const newPost = {...post, comments: [...post.comments, newData]}

            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})

        } catch (err) {
            dispatch({
                type: GLOBALTYPES.NOTIFY,
                payload: {
                    error: err.response.data.msg
                } 
            })
        }
}
export const updateComment = ({comment, post, content, authReducer}) => async (dispatch) => {
    
    const newUpdateComment = EditData(post.comments, comment._id, {...comment, content})
    const newPost = {...post, comments: newUpdateComment}

    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})

    try {
            await patchDataAPI(`comment/${comment._id}`, {content}, authReducer.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: {
                error: err.response.data.msg
            } 
        })
    }
}
export const deleteComment = ({comment, post, authReducer}) => async (dispatch) => {
    const deleteUserComment = [...post.comments.filter(cmt => cmt === comment._id), comment]

    const newPost = {
        ...post,
        comments: post.comments.filter(cmt => !deleteUserComment.find(da => cmt._id === da._id))
    }
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})

    try {
        deleteUserComment.forEach(item => {
            deleteDataAPI(`comment/${item._id}`, authReducer.token)
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