import React, {useState, useEffect, useRef} from 'react'
import DisplayUser from './DisplayUser'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import ShowMessage from './ShowMessage'
import {createChat, getChat} from '../../redux/actions/chatAction.js'

const ShowChat = () => {

    const {authReducer, chatReducer, socketReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    const {id} = useParams()

    const [user, setUser] = useState([])
    const [text, setText] = useState('')

    const refChat = useRef()
    const pageMore = useRef()

    const [page, setPage] = useState(0)

    useEffect(() => {
        const newUser = chatReducer.users.find(user => user._id === id)
          if(newUser)
            setUser(newUser)
          
    },[chatReducer.users, id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!text.trim()) return;

        const message = {
            sender: authReducer.userCurrent._id,
            recipient: id,
            text,
            createdAt: new Date().toISOString(),
        }
        await dispatch(createChat({message, authReducer, socketReducer}))
        if(refChat.current){
            refChat.current.scrollIntoView({behavior: 'smooth', block: 'end'})
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

    return (
        <>
            <div className="chat_header">
            <DisplayUser user={user}>
                <i className="fas fa-trash-alt mr-2" />
            </DisplayUser>
            </div>

            <div className="chat_container">
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

            <form className="chat_input d-flex" onSubmit={handleSubmit}>
                <input type="text" placeholder="Say something..." 
                value={text} onChange={e => setText(e.target.value)}/>

                <button type="submit" className="material-icons"
                    disabled={text ? false : true}>
                        near_me
                </button>
            </form>
        </>
    )
}

export default ShowChat