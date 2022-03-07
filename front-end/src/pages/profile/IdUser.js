import React, {useEffect} from 'react'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import {useSelector, useDispatch} from 'react-redux'
import { getProfileUsers } from '../../redux/actions/profileAction'
import {useParams} from 'react-router-dom'

const Profile = () => {

  const {authReducer, profileReducer} = useSelector(state => state)
  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if(profileReducer.ids.every(item => item !== id)){
      dispatch(getProfileUsers({users: profileReducer.users, id, authReducer}))
    }
  },[dispatch, id, profileReducer.users, authReducer])

  return (
    <div className="profile">

        <Info authReducer={authReducer} profileReducer={profileReducer} 
        dispatch={dispatch} id={id} />

        <Posts authReducer={authReducer} profileReducer={profileReducer} 
        dispatch={dispatch} id={id} />
        
    </div>
  )
}

export default Profile