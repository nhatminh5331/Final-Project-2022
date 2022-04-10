import React from 'react'
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {GLOBALTYPES} from "../../redux/actions/globalTypes"
import {deleteDataAPI} from '../../utils/fetchData'

const AllUserItem = ({users}) => {

  const {authReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleDelete = async (id) => {
      try {
          if(window.confirm("Do you really want to delete this user?"))
          {
            await deleteDataAPI(`delete/${id}`, authReducer.token)
          }

      } catch (err) {
        dispatch({
          type: GLOBALTYPES.NOTIFY, 
          payload: {
              error: err.response.data.msg
          }
      })
      }
  }

  return (
          <>
            <td>{users._id}</td>

            <td>
              <Link to={`/profile/${users._id}`} className="text-dark">
                <img src={users.avatar} alt={users.avatar} className="small-avatar"/>
              </Link>
            </td>

            <td>
              <Link to={`/profile/${users._id}`} style={{ textDecoration: 'none' }} className="text-dark">
                {users.username}
              </Link>
            </td>

            <td>{users.email}</td>
            
            <td>
              {
                users.role === 0
                ? <i className="fas fa-trash-alt" title="Remove" onClick={() => handleDelete(users._id)}></i>
                : <>
                    <p>Admin</p>
                  </>
              }
            </td>
          </>
  )
}

export default AllUserItem