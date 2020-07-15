import { combineReducers } from 'redux'
import {
  SET_USER,
  REMOVE_USER
} from './actions'

function userReducer(
    state = {
        loginState: false,
        user: null
    }, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        loginState: true,
        user: action.user
      })
    case REMOVE_USER:
      return Object.assign({}, state, {
        loginState: false,
        user: null
      })
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

const rootReducer = combineReducers({userReducer})

export default rootReducer
