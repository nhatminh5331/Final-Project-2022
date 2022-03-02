import React from "react";
import { useSelector } from "react-redux";
import Introduce from "../../components/introduce/introduce";
import Search from "../../components/Search/Search";
import PostItem from "./postItem/postItem";
// import moment from 'moment'

const Home = () => {
  const { posts } = useSelector(state => state.postReducer);

  return (
    <div>
      <Introduce />

      <Search />

      <div className="postList-wrap">
        {
            posts.map((posts) => (
              <div key={posts._id}>
                  <PostItem post={posts} />
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default Home;

            // return (
            //   <PostItem 
            //     id={post._id}
            //     time={moment(post.createdAt).fromNow()}
            //     image={post.images.url}
            //     category={post.category}
            //     title={post.title}
            //     content={post.content}
            //   />
            // );
