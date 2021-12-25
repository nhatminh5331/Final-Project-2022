import { combineReducers } from "redux"
import authReducer from './authReducer'
import notifyReducer from './notifyReducer'

const rootReducer =  combineReducers({
    authReducer,
    notifyReducer
})

export default rootReducer