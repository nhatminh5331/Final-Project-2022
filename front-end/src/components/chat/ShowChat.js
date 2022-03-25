import React, {useState, useEffect} from 'react'
import DisplayUser from './DisplayUser'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'

const ShowChat = () => {

    const {authReducer, chatReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    const {id} = useParams()

    const [user, setUser] = useState([])

    useEffect(() => {
        const newUser = chatReducer.users.find(user => user._id === id)
          if(newUser){
              setUser(newUser)
          }
    },[chatReducer.users, id])

    return (
        <>
            <div className="chat_header">
            <DisplayUser user={user}>
                <i className="fas fa-trash-alt mr-2" />
            </DisplayUser>
            </div>
        </>
    )
}

export default ShowChat