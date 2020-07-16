// import fetch from 'cross-fetch'

import {ActionType} from "../utils/constants";

export function setUser(user) {
    return {
        type: ActionType.SET_USER,
        user
    }
}

export function removeUser() {
    return {
        type: ActionType.REMOVE_USER,
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
