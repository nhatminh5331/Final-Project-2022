import React, {useState, useEffect} from 'react'
import ShowPost from './ShowPost'

const Posts = ({id, authReducer, profileReducer, dispatch}) => {
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState(4)

    useEffect(() => {
        profileReducer.allposts.forEach(data => {
            if(data._id === id) {
                setPosts(data.userPost)
                setResult(data.result)
            }
        })
    },[profileReducer.allposts, id])

    return (
        <div>
          <ShowPost posts={posts} result={result} />
        </div>
    )
}

export default Posts