import React from 'react'
import './DisplayPost.css'

const DisplayPost = ({post}) => {

  return (
        <div className="display_post d-flex p-2 align-items-center ">

            {
              post.images[0].url.match(/video/i)

              ? <video controls src={post.images[0].url} alt={post.images[0].url}/>
                              
              : <img src={post.images[0].url} alt={post.images[0].url}/>
            }
            
            <div className="ml-2 mb-1 text-dark">
                <h6 className="d-block">{post.title}</h6>
                <span>{post.category}</span>
            </div>
        </div>


  )
}

export default DisplayPost