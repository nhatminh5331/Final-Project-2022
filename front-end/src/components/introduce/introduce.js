import React from 'react';
import './introduce.css'
import {useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'

const Introduce = () => {

    const {authReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    return(
      <div className='home-header'>
        <div className='status my-4'>
        <img src={authReducer.userCurrent.avatar} alt="avatar" className="small-avatar" />
          <button className='statusBtn'
          onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: true})}>
              {authReducer.userCurrent.username}, what's game today ?
          </button>
        </div>

          <h1>
            <span>“</span> News <span>”</span>
          </h1>
          <p>
            Awesome place to find new passion  <br /> for oneself and entertained through daily new game updates.
          </p>
      </div>
    )

};

export default Introduce;