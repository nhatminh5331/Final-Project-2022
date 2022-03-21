import React from 'react'
import ListUser from '../../components/chat/ListUser'
import ShowChat from '../../components/chat/ShowChat'

const Chat = () => {
  return (
        <div className="chat d-flex">
            <div className="col-md-3 border-right px-0">
                <ListUser />
            </div>

            <div className="col-md-8 px-0">
                <div className="d-flex justify-content-center 
                align-items-center flex-column h-100">

                    <ShowChat />

                </div>
            </div>
        </div>
  )
}

export default Chat