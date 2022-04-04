import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getDataAPI} from '../../utils/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import {Link} from 'react-router-dom'
import DisplayPost from './DisplayPost'
import './Search.css';
import './DisplayPost.css'

const SearchBar = () => {
    const [searchPost, setSearchPost] = useState("")
    const [posts, setPosts] = useState([])

    const {authReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    // const history = useHistory()

    const handleSearchPost = async (e) => {
      e.preventDefault();
      if(!searchPost)
      return setPosts([]);
      
        try {
          const res = await getDataAPI(`search_post?title=${searchPost}`, authReducer.token)
          setPosts(res.data.posts)

        } catch (err) {
          dispatch({
            type: GLOBALTYPES.NOTIFY, 
            payload: {
              error: err.response.data.msg
            }
          })
        }
    }

    return(
      <div className='searchBar-wrap'>
        <form onSubmit={handleSearchPost}>
          <input
            type='text'
            placeholder='Search by Game...'
            value={searchPost}
            onChange={event => setSearchPost(event.target.value)}/>
            <button type='submit'>
              <box-icon name='search' color='white' size='20px'></box-icon>
            </button>
        </form>
        <div className='posts'>
                {
                  posts.map(post => (
                    <Link key={post._id} to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
                        <DisplayPost post={post} />
                    </Link>
                  ))
                }
        </div>
      </div>
)};

export default SearchBar;