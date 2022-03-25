import React from 'react'

const ShowMessage = ({user}) => {
  return (
        <>
          <div className="chat_info">
              <img src={user.avatar} alt="avatar" className="super-small-avatar mb-1" />
              <span className="ml-1">{user.username}</span>
          </div>

          <div className="chat_content">
              Test message 123 asd
          </div>

          <div className="chat_time">
              25/3/2022
          </div>
        </>
  )
}

export default ShowMessage