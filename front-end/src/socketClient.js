import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

const SocketClient = () => {
    const {authReducer, socketReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        socketReducer.emit('johnUser', authReducer.userCurrent._id)
    }, [socketReducer, authReducer.userCurrent._id])

  return <></>
  
}

export default SocketClient