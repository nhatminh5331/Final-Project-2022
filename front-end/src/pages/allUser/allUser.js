import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUser } from '../../redux/actions/allUserAction'
import AllUserItem from './allUserItem'

const AllUser = () => {
  const {authReducer, allUserReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
		dispatch(getAllUser(authReducer));
	}, [dispatch, authReducer]);

  return (
        <div>
          {
            allUserReducer.users.map((users) => (
              <div key={users._id}>
                  <AllUserItem users={users} />
              </div>
            ))
          }
        </div>
  )
}

export default AllUser