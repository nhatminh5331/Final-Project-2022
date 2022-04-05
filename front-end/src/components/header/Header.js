import React, { useState } from 'react'
import "./header.css"
import "../../styles/avatar.css"
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GiHamburgerMenu } from "react-icons/gi"
import "boxicons"

const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const {authReducer} = useSelector(state => state)
  
  const dispatch = useDispatch()

  return (
      <nav className="main-nav">
        <div className="logo">
          <Link to='/'>
            <span>G</span>ameta
          </Link>
        </div>

        <div
          className={
            showMenu ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
            </li>
            <li>
              <Link to="/chat" style={{ textDecoration: 'none' }}>Chat</Link>
            </li>
            <li>
              { 
                authReducer.userCurrent.role === 1 
                ? <Link to="/all_user" style={{ textDecoration: 'none' }}>Manage user</Link>
                : <Link to="/profile/6203778bbb1c830340d98358" style={{ textDecoration: 'none' }}>About</Link>
              }
            </li>
          </ul>
        </div>

        <div className="user-profile">
            <li className="nav-item dropdown">
              <span className="nav-link " href="1" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src={authReducer.userCurrent.avatar} alt="avatar" className="small-avatar" />
                  <span className="hello"> Hello, {authReducer.userCurrent.username}</span> 
              </span>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item" to={`/profile/${authReducer.userCurrent._id}`}>
                  Profile
                </Link>
                  <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/" 
                onClick={() => dispatch(logout())}>
                  Logout
                </Link>
              </div>
            </li>

          <div className="hamburger-menu">
            <Link href="#" onClick={() => setShowMenu(!showMenu)}>
              <GiHamburgerMenu />
            </Link>
          </div>
        </div>
      </nav>
  )
}

export default Header


