import React, {useState} from "react";
import { useSelector, useDispatch} from "react-redux";
import Introduce from "../../components/introduce/introduce";
import Search from "../../components/Search/Search";
import PostItem from "./postItem/postItem";
import LoadMoreBtn from "../../components/loadMoreBtn"
import { getDataAPI } from "../../utils/fetchData";
import {POST_TYPES} from "../../redux/actions/postAction"


const Home = () => {

  const {authReducer, postReducer} = useSelector(state => state)

  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)

  const handleLoadMore = async () => {
    setLoad(true)
    
    const res = await getDataAPI(`posts?limit=${postReducer.page * 9}`, authReducer.token)
    dispatch({
      type: POST_TYPES.GET_POSTS, 
      payload: {...res.data, page: postReducer.page + 1}
    })

    setLoad(false)
  }

  return (
    <div>
      <Introduce />

      <Search />

      <div className="postList-wrap">
        {
            postReducer.posts.map((posts) => (
              <div key={posts._id}>
                  <PostItem post={posts} />
              </div>
            ))
        }
      </div>

      <LoadMoreBtn result={postReducer.result} page={postReducer.page} load={load}
        handleLoadMore={handleLoadMore} />
        
    </div>
  );
};

export default Home;