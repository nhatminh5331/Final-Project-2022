import { combineReducers } from "redux"
import authReducer from './authReducer'
import notifyReducer from './notifyReducer'
import postReducer from './postReducer'
import profileReducer from './profileReducer'
import statusReducer from './statusReducer'
import detailPostReducer from './detailPostReducer'
import allUserReducer from './getAllUserReducer'
import socketReducer from './socketReducer'

const rootReducer =  combineReducers({
    authReducer,
    notifyReducer,
    profileReducer,
    statusReducer,
    postReducer,
    detailPostReducer,
    allUserReducer,
    socketReducer
})

export default rootReducer