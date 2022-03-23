import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import DisplayUser from './DisplayUser'
import {getDataAPI} from '../../utils/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'

const ListUser = () => {
  const [searchUser, setSearchUser] = useState('')
  const [users, setUsers] = useState([])

  const {authReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  const handleSearch = async (e) => {
      e.preventDefault()
      if(!searchUser) 
      return setUsers([]);
        try {
          const res =  await getDataAPI(`search_user?username=${searchUser}`, authReducer.token)
          setUsers(res.data.users)

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
        <div className="chat_search">
          <form onClick={handleSearch} >
              <input type="text" value={searchUser}
              onChange={event => setSearchUser(event.target.value)}
              placeholder="Search on chat" />
              <button>
                <box-icon name='search' color='white' size='20px'></box-icon>
              </button>
          </form>
        </div>

        <div className="chat_user_list">
            { 
              users.length !== 0
                ? <>
                    {
                      users.map(user => (
                          <Link key={user._id} to={`/profile/${user._id}`}>
                              <DisplayUser user={user} />
                          </Link>
                      ))
                    }
                  </>
                : 
                  <>
                    {/* No user */}
                  </>
            }
          </div>
      </>
  )
}

export default ListUser