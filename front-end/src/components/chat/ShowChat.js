import React, {useState, useEffect, useRef} from 'react'
import DisplayUser from './DisplayUser'
import {useSelector, useDispatch} from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import ShowMessage from './ShowMessage'
import {createChat, getChat, deleteConversation} from '../../redux/actions/chatAction.js'
import {uploadImage} from '../../utils/uploadImage'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const ShowChat = () => {

    const {authReducer, chatReducer, socketReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    const {id} = useParams()
    const history = useHistory()

    const [user, setUser] = useState([])
    const [text, setText] = useState('')

    const refChat = useRef()
    const pageMore = useRef()

    const [page, setPage] = useState(0)
    const [media, setMedia] = useState([])

    
    useEffect(() => {
        const newUser = chatReducer.users.find(user => user._id === id)
        if(newUser)
        setUser(newUser)
          
    },[chatReducer.users, id])

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
    
    const handleUploadMedia = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newMedia = []

        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newMedia.push(file)
        })

        if(err) dispatch({ 
                    type: GLOBALTYPES.NOTIFY, 
                    payload: {error: err} 
                })
        setMedia([...media, ...newMedia])
    }

    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!text.trim() && media.length === 0) return;

        setMedia([])
       
        let newArr = [];
        if(media.length > 0) 
        newArr = await uploadImage(media)

        const message = {
            sender: authReducer.userCurrent._id,
            recipient: id,
            text,
            createdAt: new Date().toISOString(),
            media: newArr,
        }

        await dispatch(createChat({message, authReducer, socketReducer}))
        if(refChat.current){
            refChat.current.scrollIntoView({block: 'end', behavior: 'smooth'})
        }
    }

    useEffect(() => {
        if(id){
            const getChatData = async () => {
                setPage(1)
                await dispatch(getChat({authReducer, id}))
                if(refChat.current){
                    refChat.current.scrollIntoView({behavior: 'smooth', block: 'end'})
                }
            }
            getChatData()
        }
    }, [id, dispatch, authReducer]);


    //Load more message
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setPage(p => p + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageMore.current)
    }, [setPage])

    useEffect(() => {
        if(chatReducer.resultData >= (page - 1) * 9 && page > 1){
            dispatch(getChat({authReducer, id, page}))
        }
    }, [id, authReducer, page, dispatch, chatReducer.resultData])


    const handleDeleteConversation = () => {
        dispatch(deleteConversation({authReducer, id}))
        return history.push('/chat')
    }

    return (
        <>
            <div className="chat_header">
                {
                    user.length !== 0 &&
                    <DisplayUser user={user}>
                        <i className="fas fa-trash-alt mr-2" style={{cursor: 'pointer'}}
                        onClick={handleDeleteConversation} />
                    </DisplayUser>
                }
            </div>

            <div className="chat_container" style={{height: media.length > 0 ? 'calc(100% - 200px)' : ''}}>
                <div className="chat_showmessage" ref={refChat}>
                    <button style={{marginTop:'-18px', opacity: 0}} ref={pageMore}>
                        More
                    </button>

                    {
                        chatReducer.data.map((msg, index) => (
                            <div key={index}>
                                {
                                    msg.sender !== authReducer.userCurrent._id && 
                                    <div className="chat_row another_showmessage">
                                        <ShowMessage user={user} msg={msg} />
                                    </div>      
                                }

                                {
                                    msg.sender === authReducer.userCurrent._id && 
                                    <div className="chat_row my_showmessage">
                                        <ShowMessage user={authReducer.userCurrent} msg={msg} />
                                    </div>      
                                }
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className="show_media" style={{display: media.length > 0 ? 'grid' : 'none'}} >
                {
                    media.map((item, index) => (
                        <div key={index} id="file_media">
                        {
                          item.type.match(/video/i) 
                          ? videoShow(URL.createObjectURL(item))
                          : imgShow(URL.createObjectURL(item))
                        }
                        <span onClick={() => handleDeleteMedia(index)}>&times;</span>
                        </div>
                    ))
                }
            </div>

            <form className="chat_input d-flex" onSubmit={handleSubmit}>
                <input type="text" placeholder="Say something..." 
                value={text} onChange={e => setText(e.target.value)}/>

                <div className="file_upload">
                    <i className="fas fa-image" />
                    <input type="file" name="file" id="file"
                    multiple accept="image/*, video/*" onChange={handleUploadMedia} />
                </div>

                <button type="submit" className="material-icons"
                    disabled={text || media.length > 0 ? false : true} >
                        send
                </button>
            </form>
        </>
    )
}

export default ShowChat