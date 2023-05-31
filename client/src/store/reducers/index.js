import { combineReducers } from 'redux'
import authReducer from './Auth'

export default combineReducers({
    auth: authReducer,
})