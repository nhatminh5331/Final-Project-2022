import React from "react";
import { Link } from "react-router-dom";
import "./detailItem.css";
import { useSelector, useDispatch } from "react-redux";
import DetailListImage from "./detailListImage";
import moment from "moment";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { deletePost } from "../../redux/actions/postAction";

const PostItem = ({ post }) => {
  const { authReducer } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure want to delete ?"))
      dispatch(deletePost({ post, authReducer }));
  };

  return (
    <div className="detailItem-wrap">
      <section>
        <div className="nav-item dropdown">
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_horiz
          </span>

          <div className="dropdown-menu">
            {authReducer.userCurrent._id === post.user && (
              <>
                <div className="dropdown-item" onClick={handleEditPost}>
                  <span className="material-icons">create</span> Edit Post
                </div>
                <div className="dropdown-item" onClick={handleDeletePost}>
                  <span className="material-icons">delete_outline</span> Delete
                  Post
                </div>
              </>
            )}
          </div>
        </div>
        <small className="text-muted">{moment(post.createdAt).fromNow()}</small>
        <h3>{post.title}</h3>
       
        <small className="text-muted">{moment(post.createdAt).format('DD/MM/YYYY')}</small>

        {post.images.length > 0 && (
          <DetailListImage images={post.images} id={post._id} />
        )}

        <p className="content">{post.content}</p>
      </section>

      <section>
    <div className="info">
      <h5>Information</h5><p>{post.information}</p>
    </div>
    <div className="category">
        <h5>Category</h5><p className="chip">{post.category}</p>
    </div>
      </section>

    </div>
  );
};

export default PostItem;
