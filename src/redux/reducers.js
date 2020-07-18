import { combineReducers } from 'redux'
import {UserActionType, TokenActionType, UserType} from "../utils/constants";

function userReducer(
    state = {
        loginState: false,
        role: UserType.VISITOR,
        user: null,
    }, action) {
  switch (action.type) {
    case UserActionType.SET_USER:
        if (action.user === null) return state;
        else return Object.assign({}, state, {
          loginState: true,
          role: action.user.user_type,
          user: action.user
        });
    case UserActionType.REMOVE_USER:
        return Object.assign({}, state, {
          loginState: false,
          role: UserType.VISITOR,
          user: null,
        });
    default:
      return state
  }
}


function tokenReducer(
    state = '', action) {
    switch (action.type) {
        case TokenActionType.SET_TOKEN:
            return action.token
        case TokenActionType.REMOVE_TOKEN:
            return ''
        default:
            return state
    }
}

const rootReducer = combineReducers({userReducer, tokenReducer})

export default rootReducer
