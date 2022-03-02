import React from 'react';
import { Link } from "react-router-dom";
import Chip from './chipCategory'
import './postItem.css'
import { useSelector } from 'react-redux'
import ListImage from '../postItem/listImage'
import moment from 'moment'

const PostItem = ({post}) => {
  const {authReducer} = useSelector(state => state)
  
  return (
    <div className='postItem-wrap'>
        
        <div className='nav-item dropdown'>
            <span className="material-icons" id="moreLink" data-toggle="dropdown">
                  more_horiz
            </span>

            <div className="dropdown-menu">
                {
                  // authReducer.userCurrent._id === post.user._id &&
                  <>
                      <div className="dropdown-item">
                          <span className="material-icons">create</span> Edit Post
                      </div>
                      <div className="dropdown-item">
                          <span className="material-icons">delete_outline</span> Delete Post
                      </div>
                  </>
                }
            </div>
        </div>

        {
            post.images.length > 0 && <ListImage images={post.images} id={post._id} />
        }   

<small className='text-muted'>
          {moment(post.createdAt).fromNow()}
        </small>
      <Link to={`/post/${post._id}`}>
        <Chip label={post.category} />
        <h3>{post.title}</h3>
      </Link>
        <p className='postItem-desc'>{post.content}</p>
    </div>
  );
};

export default PostItem;