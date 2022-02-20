import React, { useState } from 'react'
import "./header.css"
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/authAction'
import { GiHamburgerMenu } from "react-icons/gi"

const Header = () => {

  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const {authReducer} = useSelector(state => state)
  const dispatch = useDispatch()

  return (
      <nav className="main-nav">
        <div className="logo">
          <h2>
            <span>G</span>ame
            <span>M</span>ortal
          </h2>
        </div>

        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
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
                <Link className="dropdown-item" to={`/profile/${authReducer.userCurrent._id}`}>Profile</Link>
                  <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to="/" 
                onClick={() => dispatch(logout())}>
                  Logout</Link>
              </div>
            </li>

          <div className="hamburger-menu">
            <Link href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <GiHamburgerMenu />
            </Link>
          </div>
        </div>
      </nav>
  )
}

export default Header


