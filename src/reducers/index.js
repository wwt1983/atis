import { combineReducers } from 'redux'
import admin from './admin'
import layout from './layout'
import auth from './auth'
import data from './data'
import userflow from './userflow'

export default combineReducers({
    admin,
    layout,
    auth,
    data,
    userflow
})
