import React from 'react'

const AllUserItem = ({users}) => {
  return (
      <div>
        Username: {users.username}
        Email: {users.email}
      </div>
  )
}

export default AllUserItem