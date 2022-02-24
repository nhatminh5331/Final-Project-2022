import React from "react";
import { useSelector } from "react-redux";
import Introduce from "../../components/introduce/introduce";
import SearchBar from "../../components/search/search";
import PostItem from "./postItem/postItem";

const Home = () => {
  const { posts } = useSelector((state) => state.postReducer);
  console.log(posts);

  return (
    <div>
      <Introduce />

      <SearchBar />

      <div className="postList-wrap">
        {posts.map((post) => {
            return (
              <PostItem
                id={post._id}
                image={post.images.url}
                category={post.category}
                title={post.title}
                content={post.content}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
