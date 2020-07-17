import { combineReducers } from 'redux'
import {UserActionType, TokenActionType} from "../utils/constants";

function userReducer(
    state = {
        loginState: false,
        user: null,
    }, action) {
  switch (action.type) {
    case UserActionType.SET_USER:
      return Object.assign({}, state, {
        loginState: true,
        user: action.user
      })
    case UserActionType.REMOVE_USER:
      return Object.assign({}, state, {
        loginState: false,
        user: null
      })
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

// function selectedSubreddit(state = 'reactjs', action) {
//   switch (action.type) {
//     case SELECT_SUBREDDIT:
//       return action.subreddit
//     default:
//       return state
//   }
// }
//
// function posts(
//   state = {
//     isFetching: false,
//     didInvalidate: false,
//     items: []
//   },
//   action
// ) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//       return Object.assign({}, state, {
//         didInvalidate: true
//       })
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         isFetching: true,
//         didInvalidate: false
//       })
//     case RECEIVE_POSTS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         didInvalidate: false,
//         items: action.posts,
//         lastUpdated: action.receivedAt
//       })
//     default:
//       return state
//   }
// }
//
// function postsBySubreddit(state = {}, action) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         [action.subreddit]: posts(state[action.subreddit], action)
//       })
//     default:
//       return state
//   }
// }

const rootReducer = combineReducers({userReducer, tokenReducer})

export default rootReducer