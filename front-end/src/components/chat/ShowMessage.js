import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {deleteChat} from '../../redux/actions/chatAction'

const ShowMessage = ({user, msg}) => {

  const {authReducer, chatReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleDeleteMsg = () => {
    if(chatReducer.data)
      dispatch(deleteChat({msg, authReducer, chatReducer}))
  }

  return (
        <>
          <div className="chat_info">
              <img src={user.avatar} alt="avatar" className="super-small-avatar mb-1" />
              <span className="ml-1">{user.username}</span>
          </div>

          <div className="my_text">
            {
              user._id === authReducer.userCurrent._id && <i className="fas fa-trash-alt mr-2 text-danger" onClick={handleDeleteMsg} />
            }
              <div>
                {
                  msg.text && <div className="chat_content">{msg.text}</div>
                }
                {
                  msg.media.map((item, index) => (
                    <div key={index}>
                        {
                          item.url.match(/video/i) 
                          ? <video controls src={item.url} alt={item.url} />
                          : <img src={item.url} alt={item.url} />
                        }
                    </div>
                  ))
                }
              </div>
          </div>

          <div className="chat_time">
              {new Date(msg.createdAt).toLocaleString()}
          </div>
        </>
  )
}

export default ShowMessage