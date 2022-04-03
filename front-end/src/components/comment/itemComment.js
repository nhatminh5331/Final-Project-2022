import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {useSelector, useDispatch} from 'react-redux'
import {updateComment, deleteComment} from '../../redux/actions/commentAction'
import './inputComment.css'

const ItemComment = ({comment, post}) => {

    const {authReducer, socketReducer} = useSelector(state => state) 
    const dispatch = useDispatch()

    const [content, setContent] = useState('')
    const [onEdit ,setOnEdit] = useState(false)

    useEffect(() => {
        setContent(comment.content)
    }, [comment])

    const handleUpdateComment = () => {
        if(comment.content !== content){
            dispatch(updateComment({comment, post, content, authReducer}))
            setOnEdit(false)
        }else{
            setOnEdit(false)
        }
    }

    const handleDelete = () => {
        dispatch(deleteComment({comment, post, authReducer, socketReducer}))
    }

    const MenuComment = () => {
        return(
            <>
                <div className="dropdown-item" onClick={() => setOnEdit(true)}>
                    <span className="material-icons">create</span> Edit
                </div>
                <div className="dropdown-item" onClick={handleDelete}>
                    <span className="material-icons">delete_outline</span> Delete
                </div>
            </>
        )
    }

    return (
        <div className="commentItem mt-2">

                <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
                    <img src={comment.user.avatar} alt="cover" className="super-small-avatar"/>
                    <h6 className="mx-1 mt-1">{comment.user.username}</h6> 
                </Link>
            <div className="commentContent">
                    <div className="flex-fill ml-2">
                        {   onEdit 
                            ? <textarea rows="5" value={content}
                            onChange={event => setContent(event.target.value)} />
                            :   <div>
                                    <span>
                                        {comment.content}
                                    </span>
                                </div>  
                        }
                        
                    </div>

                    <small className="text-muted ml-2">
                        {moment(comment.createdAt).fromNow()}
                    </small>
                    {
                        onEdit 
                        ?   <>
                                <small className="font-weight-bold mr-3 ml-3" style={{cursor: 'pointer'}}
                                onClick={handleUpdateComment}>
                                    Update
                                </small>
                                <small className="font-weight-bold mr-3" style={{cursor: 'pointer'}}
                                onClick={() => setOnEdit(false)}>
                                    Cancel
                                </small>
                            </>
                        :   <>
                                 {/* Nothing */}
                            </>
                    }
            
            <div className="commentMenu">
                {
                    (authReducer.userCurrent._id === post.user._id || authReducer.userCurrent._id === comment.user._id) &&
                    
                    <div className="nav-item dropdown">
                        <span className="material-icons" id="moreLink" data-toggle="dropdown">
                            more_horiz
                        </span>

                        <div className="dropdown-menu" aria-labelledby="moreLink">
                            {
                                authReducer.userCurrent._id === post.user._id ? authReducer.userCurrent._id === comment.user._id 
                                ?   MenuComment()
                                : <div className="dropdown-item" onClick={handleDelete}>
                                     <span className="material-icons">delete_outline</span> Delete
                                  </div>
                                :   MenuComment()
                            }
                        </div>
                    </div>

                }
            </div>
            
            </div>
            
        </div>
        
    )
}

export default ItemComment