import React from 'react'
import './DisplayUser.css'

const DisplayUser = ({user}) => {

  return (
      <div className="display_user d-flex p-2 align-item-center">
        <img src={user.avatar} alt="avatar" className="small-avatar" />
        <h6 className="text-dark ml-2 mt-2">{user.username}</h6>
      </div>
  )
}

export default DisplayUser