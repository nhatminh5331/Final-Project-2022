import React from 'react'
import {Link} from 'react-router-dom'

const ShowPost = ({posts, result}) => {

    if(result === 0) return <h3 className="text-center">No Game</h3>

    return (
        <div className="showPost">
            {
                posts.map(post =>(
                    <Link key={post._id} to={`/post/${post._id}`}>
                        <div className="showPost_display">
                            <img src={post.images[0].url} alt={post.images[0].url} />

                            <div className="showPost_comment">
                                <i className="far fa-comment"> {post.comments.length}</i>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default ShowPost