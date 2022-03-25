import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import DisplayUser from './DisplayUser'
import {getDataAPI} from '../../utils/fetchData'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import {useHistory} from 'react-router-dom'
import {getInfoUser} from '../../redux/actions/chatAction'

const SearchUser = () => {
  const [searchUser, setSearchUser] = useState('')
  const [users, setUsers] = useState([])

  const {authReducer, chatReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  const history = useHistory()

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

  const handleGetInfoUser = (user) => {
      setSearchUser('')
      setUsers([])
      dispatch(getInfoUser({user, chatReducer}))
      return history.push(`/chat/${user._id}`)
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
                ? 
                  <>
                    {
                      users.map(user => (
                          <div key={user._id} onClick={() => handleGetInfoUser(user)}>
                            <DisplayUser user={user}/>
                          </div>
                      ))
                    }
                  </>
                : 
                  <>
                    {
                      chatReducer.users.map(user => (
                          <div key={user._id} onClick={() => handleGetInfoUser(user)}>
                            <DisplayUser user={user}/>
                          </div>
                      ))
                    }
                  </>
            }
          </div>
      </>
  )
}

export default SearchUser