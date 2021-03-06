import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import EditProfile from './EditProfile'
import {getInfoUser} from '../../redux/actions/chatAction'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

const Info = ({id, authReducer, profileReducer, dispatch}) => {
    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    const {chatReducer} = useSelector(state => state)
    const history = useHistory()

    useEffect(() => {
        if(id === authReducer.userCurrent?._id){ 
            setUserData([authReducer.userCurrent])
         }else{
           const newData = profileReducer.users.filter(user => user._id === id)
           setUserData(newData)
         }
    }, [id, authReducer, dispatch, profileReducer.users])

    const handleGetInfoUser = (user) => {
      dispatch(getInfoUser({user, chatReducer}))
      return history.push(`/chat/${user._id}`)
  }
    
  return (
    <div className="info">
      {
        userData.map(user => (
            <div className="info_container" key={user._id}>
                <img src={user.avatar} alt="avatar" className="big-avatar" />

                <div className="info_profile">
                    <div className="info_profile_title">

                        <h2>{user.username}</h2>

                        {
                          user._id === authReducer.userCurrent?._id

                          ? <button className="btn btn-outline-info"
                            onClick={() => setOnEdit(true)}>
                              Update 
                            </button>

                          : <button className="btn btn-outline-info"
                            onClick={() => handleGetInfoUser(user)}>
                              Message
                            </button>
                            
                          
                        }

                    </div>

                    <h5>{user.fullname}</h5>
                    <p>{user.address}</p>
                    <Link to={user.email} target="_blank">{user.email}</Link>
                    <p>{user.story}</p>
    
                </div>

                {
                    onEdit && 
                    <EditProfile 
                    setOnEdit={setOnEdit}  
                    />
                }
        
            </div>
        ))
      }
    </div>
  )
}

export default Info