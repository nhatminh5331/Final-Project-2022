import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { POST_TYPES } from './redux/actions/postAction'
import { CHAT_TYPES } from './redux/actions/chatAction'

const SocketClient = () => {
    const {authReducer, socketReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        socketReducer.emit('johnUser', authReducer.userCurrent._id)
    }, [socketReducer, authReducer.userCurrent._id])
    


    //Comment
    useEffect(() => {
        socketReducer.on('createCommentToClient', newPost => {
            dispatch({
              type: POST_TYPES.UPDATE_POST,
              payload: newPost
            })
        })
            return() => socketReducer.off('createCommentToClient')
    }, [socketReducer, dispatch])

    useEffect(() => {
      socketReducer.on('deleteCommentToClient', newPost => {
          dispatch({
            type: POST_TYPES.UPDATE_POST,
            payload: newPost
          })
      })
          return() => socketReducer.off('deleteCommentToClient')
  }, [socketReducer, dispatch])

  

    //Chat
    useEffect(() => {
      socketReducer.on('createChatToClient', message => {
        // console.log(message)
          dispatch({
            type: CHAT_TYPES.CREATE_CHAT,
            payload: message
          })
      })
          return() => socketReducer.off('createChatToClient')
  }, [socketReducer, dispatch])

  return <></>
  
}

export default SocketClient