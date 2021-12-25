import React from 'react'
import Toast from './Toast'
import {useSelector, useDispatch} from 'react-redux'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'

const Notify = () => {
    const {notifyReducer} = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
             {
             notifyReducer.error && 
             <Toast msg={{title: 'Error', body: notifyReducer.error}} 
             handleShow={() => dispatch({type: GLOBALTYPES.NOTIFY, payload: {}})}
             bgColor="bg-danger" />
             }

             {
             notifyReducer.success && 
             <Toast msg={{title: 'Success', body: notifyReducer.success}} 
             handleShow={() => dispatch({type:GLOBALTYPES.NOTIFY, payload: {}})}
             bgColor="bg-success" />
             }
        </div>
    )
}

export default Notify
