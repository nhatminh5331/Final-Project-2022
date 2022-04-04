import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUser } from '../../redux/actions/allUserAction'
import AllUserItem from './allUserItem'
import './allUser.css'

const AllUser = () => {
  const {authReducer, allUserReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
		dispatch(getAllUser(authReducer));
	}, [dispatch, authReducer]);

  return (
        <div style={{overflowX: "auto"}}>
          <table className="table_user">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Avatar</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Function</th>
                </tr>
              </thead>
              <tbody>
                {
                  allUserReducer.users.map((users) => (
                    <tr key={users._id}>
                        <AllUserItem users={users} />
                    </tr>
                  ))
                }
            </tbody>
          </table>
        </div>
  )
}

export default AllUser