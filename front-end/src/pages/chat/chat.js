import React from 'react'
import SearchUser from '../../components/chat/SearchUser'

const Chat = () => {
  return (
        <div className="chat d-flex">
            <div className="col-md-3 border-right px-0">

                <SearchUser />

            </div>

            <div className="col-md-8 px-0">
                    <h2>Nothing here</h2>
            </div>
        </div>
  )
}

export default Chat