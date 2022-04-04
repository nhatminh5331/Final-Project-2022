import React from 'react'
import { Link } from "react-router-dom";

const AllUserItem = ({users}) => {
  return (
          <>
            <td>{users._id}</td>

            <td>
              <Link to={`/profile/${users._id}`} className="text-dark">
                <img src={users.avatar} alt={users.avatar} className="small-avatar"/>
              </Link>
            </td>

            <td>
              <Link to={`/profile/${users._id}`} className="text-dark">
                {users.username}
              </Link>
            </td>

            <td>{users.email}</td>
            
            <td>
              {
                users.role === 0
                ? <i className="fas fa-trash-alt" title="Remove"></i>
                : <>
                    <p>Admin</p>
                  </>
              }
            </td>
          </>
  )
}

export default AllUserItem