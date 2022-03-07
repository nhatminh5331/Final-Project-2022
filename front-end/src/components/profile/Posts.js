import React, {useState, useEffect} from 'react'
import ShowPost from './ShowPost'

const Posts = ({id, authReducer, profileReducer, dispatch}) => {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(4)

    useEffect(() => {
        profileReducer.userPosts.forEach(data => {
            if(data._id === id) {
                setPosts(data.detailPost)
                setResult(data.result)
            }
        })
    },[profileReducer.userPosts, id])

    return (
        <div>
          <ShowPost posts={posts} result={result} />
        </div>
    )
}

export default Posts