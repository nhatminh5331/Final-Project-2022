import React from 'react'
import { Link } from "react-router-dom";
import './allUser.css'

const AllUserItem = ({users}) => {
  return (
      <div>
          <table className="table_user">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Avatar</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
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
              </tbody>
          </table>
      </div>
  )
}

export default AllUserItem