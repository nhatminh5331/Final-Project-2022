import { combineReducers } from "redux"
import authReducer from './authReducer'
import notifyReducer from './notifyReducer'
import postReducer from './postReducer'

const rootReducer =  combineReducers({
    authReducer,
    notifyReducer,
    postReducer,
})

export default rootReducer