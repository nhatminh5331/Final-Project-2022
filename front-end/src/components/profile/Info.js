import React, { useState, useEffect } from 'react'
import {useParams, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { getProfileUsers } from '../../redux/actions/profileAction'
import EditProfile from './EditProfile'

const Info = () => {
    const {id} = useParams()
    const {authReducer, profileReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState([])
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        if(id === authReducer.userCurrent?._id){ 
            setUserData([authReducer.userCurrent])
         }else{
           dispatch(getProfileUsers({users: profileReducer.users, id, authReducer}))
           const newData = profileReducer.users.filter(user => user._id === id)
           setUserData(newData)
         }
    }, [id, authReducer, dispatch, profileReducer.users])
    
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
                          user._id === authReducer.userCurrent._id
                          ? <button className="btn btn-outline-info"
                          onClick={() => setOnEdit(true)}>
                            Update 
                          </button>

                          : <button className="d-none"></button>
                          
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