const apiUrl = 'http://localhost:8080';
const mockUrl = 'http://47.98.185.162:7300/mock/5f0eb1a258dbdc84af53cdbb/Amoy';

const UserActionType = {
    SET_USER: 'set user',
    REMOVE_USER: 'remove user'
}

const TokenActionType = {
    SET_TOKEN: 'set token',
    REMOVE_TOKEN: 'remove token'
}

const APIModules = {
    USER: '/users',
    ADMIN: '/admins',
    BLOG: '/blogs',
    TOPIC: '/topics'
}

const UserType = {
    ADMIN: 0,
    CUSTOMER: 1
}

export {apiUrl, mockUrl, UserActionType, TokenActionType, UserType, APIModules}
