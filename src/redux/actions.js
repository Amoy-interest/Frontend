// import fetch from 'cross-fetch'

import {UserActionType, TokenActionType} from "../utils/constants";

export function setUser(user) {
    return {
        type: UserActionType.SET_USER,
        user
    }
}

export function removeUser() {
    return {
        type: UserActionType.REMOVE_USER,
    }
}

export function setToken(token) {
    return {
        type: TokenActionType.SET_TOKEN,
        token
    }
}

export function removeToken() {
    return {
        type: TokenActionType.REMOVE_TOKEN,
    }
}


// function receivePosts(subreddit, json) {
//     return {
//         type: RECEIVE_POSTS,
//         subreddit,
//         posts: json.data.children.map(child => child.data),
//         receivedAt: Date.now()
//     }
// }

// function fetchPosts(subreddit) {
//     return dispatch => {
//         dispatch(requestPosts(subreddit))
//         return fetch(`https://www.reddit.com/r/${subreddit}.json`)
//             .then(response => response.json())
//             .then(json => dispatch(receivePosts(subreddit, json)))
//     }
// }
