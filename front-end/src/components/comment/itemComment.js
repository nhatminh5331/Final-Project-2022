import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import './inputComment.css'

const ItemComment = ({comment, post}) => {

    return (
        <div className="commentItem mt-2">

                <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
                    <img src={comment.user.avatar} alt="cover" className="super-small-avatar"/>
                    <h6 className="mx-1 mt-1">{comment.user.username}</h6> 
                </Link>
            <div className="commentContent">
                <div>
                    <div className="flex-fill ml-2">
                        <span>
                            {comment.content}
                        </span>
                    </div>
                </div>

                <div>
                    <small className="text-muted ml-2">
                        {moment(comment.createdAt).fromNow()}
                    </small>
                </div>
            </div>
            
        </div>
        
    )
}

export default ItemComment