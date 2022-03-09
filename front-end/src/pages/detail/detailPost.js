import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions/postAction'
import DetailItem from './detailItem';


const DetailPost = () => {
  const {id} = useParams()
  const [post, setPost] = useState([])

  const {authReducer, detailPostReducer} = useSelector(state => state)
  console.log(detailPostReducer)
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(getPost({detailPostReducer, id, authReducer}))

      if(detailPostReducer.length > 0) {
        const newArr = detailPostReducer.filter(post => post._id === id)
        setPost(newArr)
      }
  }, [detailPostReducer, authReducer, dispatch, id])

  return (
    <div className="detailPost">
        {
            post.map((item) => (
                  <DetailItem key={item._id} post={item} />
            ))
        }        
    </div>
  )
}

export default DetailPost