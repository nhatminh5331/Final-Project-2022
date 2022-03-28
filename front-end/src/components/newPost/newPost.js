import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import { createPost, updatePost } from '../../redux/actions/postAction'
import './newPost.css'

const Createpost = () => {
  const { authReducer, statusReducer } = useSelector(state => state)
  const dispatch = useDispatch()

  const [postData, setPostData] = useState({title: '', information: '', content: '', category: ''})
  const {title, information, content, category} = postData

  const [images, setImages] = useState([])


  const handleChangeImage = (event) => {
    const files = [...event.target.files]
    let err = ""
    let newImages = []

    files.forEach(file => {
      if(!file) return err = "File does not exist."

      if(file.size > 1024*1024*5) {
        return err = "The maximum file size is 5mb"
      }

      if(file.size > 1024 * 1024 * 5){
          return err = "The image/video largest is 5mb."
      }

      return newImages.push(file)
    })

    console.log(files)
    if(err) dispatch({ type: GLOBALTYPES.NOTIFY, payload: {error: err} })
    setImages([...images, ...newImages])

  }

  const deleteImages = (index) => {
      const newArr = [...images]
      newArr.splice(index, 1)
      setImages(newArr)
  }

  const handleInput = (event) => {
    const {name, value} = event.target
    setPostData({...postData, [name]: value})
}

  const handleSubmit = (event) => {
      event.preventDefault()

      if(statusReducer.onEdit){
        dispatch(updatePost({postData, images, authReducer, statusReducer}))
        dispatch({type: GLOBALTYPES.STATUS, payload: false})
      }else{
        dispatch(createPost({postData, images, authReducer}))
        dispatch({type: GLOBALTYPES.STATUS, payload: false})
      }
  }

  useEffect(() => {
      if(statusReducer.onEdit){
          setPostData(statusReducer.images)
          setImages(statusReducer.images)
      }
  }, [statusReducer])


  const imgShow = (src) => {
      return(
          <img src={src} alt="images" className="img-thumbnail" />
      )
  }

  const videoShow = (src) => {
    return(
        <video controls src={src} alt="images" className="img-thumbnail" />
    )
  }

    return (
        <div className="newPost">
            <form onSubmit={handleSubmit}>
                <div className="create_header">
                    <h5 className="m-0">New post</h5>

                    <span onClick={() => dispatch({
                      type: GLOBALTYPES.STATUS, payload: false
                      })}>
                        &times;
                    </span>

                </div>

                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <div>
                    <input type="text" className="form-control" value={title}
                    name="title" onChange={handleInput}/> 
                  </div> 
                </div>

                <div className="form-group">
                  <label htmlFor="information">Information</label>
                    <textarea name="information" value={information} cols="30" rows="3"
                    className="form-control" onChange={handleInput}/>
                </div>

                <div className="form-group">
                  <label htmlFor="content">Content</label>
                    <textarea name="content" value={content} cols="30" rows="7"
                    className="form-control" onChange={handleInput}/>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <div>
                    <input type="text" className="form-control"
                    name="category" value={category} onChange={handleInput}/> 
                  </div> 
                </div>


                <div className="show_images">
                    {
                      images.map((img, index) => (
                          <div key={index} id="file_img" >
                              {
                                  img.camera ? imgShow(img.camera)
                                  : img.url 
                                  ? <>
                                        {
                                          img.url.match(/video/i)
                                          ? videoShow(img.url) : imgShow(img.url)
                                        }
                                    </>
                                  : <>
                                        {
                                          img.type.match(/video/i)
                                          ? videoShow(URL.createObjectURL(img)) : imgShow(URL.createObjectURL(img))
                                        }
                                    </>
                              }
                              <span onClick={() => deleteImages(index)}>&times;</span>

                          </div>
                      ))
                    }
                </div>


                <div className="input_images">

                    <div className="file_upload">
                      <i className="fas fa-images"/>
                      <input type="file" name="file" id="file"
                      multiple accept="image/*,video/*" onChange={handleChangeImage}/>
                    </div>
                    
                </div>
             
                    <button className="btn btn-info w-100" type="submit">
                      Post
                    </button>

            </form>
        </div>
    )
}

export default Createpost