import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {checkImage} from '../../utils/uploadImage'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import { updateProfileUser } from '../../redux/actions/profileAction'

const EditProfile = ({setOnEdit}) => {
    const initialState = {
        fullname: '', username: '', address: '', story: ''
    }
    const [userData, setUserData] = useState(initialState)
    const {fullname, username, address, story} = userData

    const [avatar, setAvatar] = useState('')

    const {authReducer} = useSelector(state => state)
    const dispatch = useDispatch()


    useEffect(() => {
        setUserData(authReducer.userCurrent)
    }, [authReducer.userCurrent])


    const changeAvatar = (event) => {
        const file = event.target.files[0]
        const err = checkImage(file)
        if(err) return dispatch({
            type: GLOBALTYPES.NOTIFY, 
            payload: {error: err}
        })
        setAvatar(file)
    }

    const handleInput = (event) => {
        const {name, value} = event.target
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(updateProfileUser({userData, avatar, authReducer}))
    }

  return (
    <div className="editProfile">
        <form onSubmit={handleSubmit}>

            <div className="edit_header">

                <h5 className="m-0">Edit user</h5>

                <span onClick={() => setOnEdit(false)}>
                    &times;
                </span>
            </div>

            <div className="info_avatar">
                <img  src={avatar ? URL.createObjectURL(avatar) : authReducer.userCurrent.avatar} alt="avatar"/>

                <span>
                    <i className="fas fa-camera"/>
                    <p>Change</p>
                    <input type="file" name="file" id="file_up"
                    accept="image/*" onChange={changeAvatar}/>
                </span>
            </div>

            <div className="form-group">
                <label htmlFor="fullname">Full name</label>
                <div>
                   <input type="text" className="form-control" id="fullname"
                   name="fullname" value={fullname} onChange={handleInput}/> 
                </div> 
            </div>

            <div className="form-group">
                <label htmlFor="username">User name</label>
                <div>
                   <input type="text" className="form-control" id="username"
                   name="username" value={username} onChange={handleInput}/> 
                </div> 
            </div>

            <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={address}
                    className="form-control" onChange={handleInput} />
            </div>

            <div className="form-group">
                    <label htmlFor="story">Story</label>
                    <textarea name="story" value={story} cols="30" rows="3"
                    className="form-control" onChange={handleInput} />

                    <small className="text-danger d-block text-right">
                        {story.length}/150
                    </small>
            </div>

            <button className="btn btn-info w-100" type="submit">Save</button>
        </form>
    </div>
  )
}

export default EditProfile