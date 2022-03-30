import React from 'react'

const ShowMessage = ({user, msg}) => {
  return (
        <>
          <div className="chat_info">
              <img src={user.avatar} alt="avatar" className="super-small-avatar mb-1" />
              <span className="ml-1">{user.username}</span>
          </div>

          {
            msg.text && <div className="chat_content">{msg.text}</div>
          }

          <div className="chat_time">
              {new Date(msg.createdAt).toLocaleString()}
          </div>
        </>
  )
}

export default ShowMessage