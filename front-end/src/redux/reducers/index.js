import { combineReducers } from "redux"
import authReducer from './authReducer'
import notifyReducer from './notifyReducer'
import postReducer from './postReducer'
import profileReducer from './profileReducer'

const rootReducer =  combineReducers({
    authReducer,
    notifyReducer,
    postReducer,
    profileReducer,
})

export default rootReducer