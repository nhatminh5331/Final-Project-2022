import React from 'react';
import { Link } from "react-router-dom";
import Chip from './chipCategory'
import './postItem.css'
import { useSelector, useDispatch } from 'react-redux'
import ListImage from '../postItem/listImage'
import moment from 'moment'
import {GLOBALTYPES} from '../../../redux/actions/globalTypes'
import {deletePost} from '../../../redux/actions/postAction'

const PostItem = ({post}) => {
  const {authReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleEditPost = () => {
      dispatch({type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
  }

  const handleDeletePost = () => {
    if(window.confirm('Are you sure want to delete ?'))
      dispatch(deletePost({post, authReducer}))
  }
  
  return (
    <div className='postItem-wrap'>
        <div className="header">
          <div className="d-flex">
            <img src={post.user.avatar} alt="cover" className="small-avatar"/> 
            <h6>
              <Link to={`/profile/${post.user._id}`} className="text-dark">
                  {post.user.username}
              </Link>
            </h6>
          </div>

            <div className='nav-item dropdown'>
              {authReducer.userCurrent._id === post.user._id &&
                <>
                  <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                  </span>

                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={handleEditPost}>
                      <span className="material-icons">create</span> Edit Post
                    </div>
                    <div className="dropdown-item" onClick={handleDeletePost}>
                        <span className="material-icons">delete_outline</span> Delete Post
                    </div>
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

        <h3>{post.title}</h3>
        
      <Link to={`/post/${post._id}`}>
      <p className='info'>{post.information}</p>
      </Link>

      <Chip label={post.category} />

      <div className='d-flex justify-content-between'>
      <Link to={`/post/${post._id}`} className='text-dark'>
        <i className='far fa-comment'/>
      </Link>
        <p className="cmt">
          {post.comments.length} comments
        </p>
      </div>
    </div>
  );
};

export default PostItem;