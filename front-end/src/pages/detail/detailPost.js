import React from 'react'
import {useParams} from 'react-router-dom'

const DetailPost = () => {
  const {id} = useParams()

  return (
    <div>DetailPost {id}</div>
  )
}

export default DetailPost