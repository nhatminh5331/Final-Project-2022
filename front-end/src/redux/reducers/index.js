import { combineReducers } from "redux"
import authReducer from './authReducer'
import notifyReducer from './notifyReducer'
import postReducer from './postReducer'
import profileReducer from './profileReducer'
import statusReducer from './statusReducer'
import detailPostReducer from './detailPostReducer'
import allUserReducer from './getAllUserReducer'

const rootReducer =  combineReducers({
    authReducer,
    notifyReducer,
    profileReducer,
    statusReducer,
    postReducer,
    detailPostReducer,
    allUserReducer
})

export default rootReducer