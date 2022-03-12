import { GLOBALTYPES } from './globalTypes'
import { POST_TYPES } from './postAction'
import { postDataAPI } from '../../utils/fetchData'

export const createComment = (post, newComment, authReducer) => async (dispatch) => {

        const newPost = {...post, comments: [...post.comments, newComment]}

        dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})

        try {
            const data = {...newComment, postId: post._id}
            const res = await postDataAPI('comment', data, authReducer.token)
            console.log(res)
            
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.NOTIFY,
                payload: {
                    error: err.response.data.msg
                } 
            })
        }
}