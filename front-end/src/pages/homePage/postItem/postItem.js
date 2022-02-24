import React from 'react';
import { Link } from "react-router-dom";
import Chip from './chipCategory'
import './postItem.css'

const PostItem = ({id, title, image, content, category}) => {

  return (
    <div className='postItem-wrap'>
      <Link to={`/post/${id}`}>
        <img className='postItem-cover' src={image} alt="cover" />
        <Chip label={category} />
        <h3>{title}</h3>
        </Link>
        <p className='postItem-desc'>{content}</p>
    </div>
  );
};

export default PostItem;