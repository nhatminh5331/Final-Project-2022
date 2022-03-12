import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './inputComment.css'
import { createComment } from '../../redux/actions/commentAction'

const InputComment = ({post}) => {
    const [content, setContent] = useState('')

    const {authReducer} = useSelector(state => state)
    const dispatch = useDispatch()


    const handleSubmit = (event) => {
        event.preventDefault()
        if(!content.trim()) return;

        const newComment = {
            content,
            user: authReducer.userCurrent,
            createdAt: new Date().toISOString()
        }

        dispatch(createComment(post, newComment, authReducer))
    }

    return (
        <form className="commentInput card-footer" onSubmit={handleSubmit}>
            {/* {children} */}
            <input type="text" placeholder="Add comment..."
            value={content} onChange={e => setContent(e.target.value)} />

            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    )
}

export default InputComment