import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import users from './users'
import filterUsers from './filterUsers'

export default combineReducers({
    users,
    filterUsers,
    form: formReducer
})