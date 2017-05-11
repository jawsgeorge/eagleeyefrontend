import { combineReducers } from 'redux'

import login from './loginReducer.js'
import home from './homeReducer.js'

export default combineReducers({
  login,
  home,
})