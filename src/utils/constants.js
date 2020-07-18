const devUrl = 'http://52.90.204.208:8080';
const mockUrl = 'http://47.98.185.162:7300/mock/5f0eb1a258dbdc84af53cdbb/Amoy';
const apiUrl = mockUrl;

const UserActionType = {
    SET_USER: 'set user',
    REMOVE_USER: 'remove user'
};

const TokenActionType = {
    SET_TOKEN: 'set token',
    REMOVE_TOKEN: 'remove token'
};

const APIModules = {
    USER: '/users',
    ADMIN: '/admins',
    BLOG: '/blogs',
    TOPIC: '/topics'
};

const UserType = {
    VISITOR: -1,
    CUSTOMER: 0,
    ADMIN: 1
};

const AuthorityLevel = {
    VISITOR: -1,
    CUSTOMER: 0,
    ADMIN: 1
};

export {apiUrl, mockUrl, devUrl,
    UserActionType, TokenActionType, APIModules,
    UserType, AuthorityLevel};
