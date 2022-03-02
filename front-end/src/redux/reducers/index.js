import { combineReducers } from "redux"
import authReducer from './authReducer'
import notifyReducer from './notifyReducer'
import postReducer from './postReducer'
import profileReducer from './profileReducer'
import statusReducer from './statusReducer'

const rootReducer =  combineReducers({
    authReducer,
    notifyReducer,
    profileReducer,
    statusReducer,
    postReducer,
})

export default rootReducer