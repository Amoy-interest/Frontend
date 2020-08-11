const devUrl = 'http://52.90.204.208:8080';
const serverUrl='http://120.55.194.144:8082/';
const mockUrl = 'http://47.98.185.162:7300/mock/5f0eb1a258dbdc84af53cdbb/Amoy';
const localUrl = 'http://localhost:8082';
const apiUrl = serverUrl;

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
    TOPIC: '/topics',
    COMMENTS:'/comments',
    SENSITIVEWORD: '/keywords',
    ALI: '/aliyun',
    SEARCH: '/search'
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

const PostType = {
    RANDOM: 0,
    RECOMMEND: 1,
    FOLLOW: 2,
    OWN: 3,
    FORWARD: 4,
    TOPIC:5,
    SEARCH:6
};

const MsgType = {
    ADD_POST: "addPost",
    SET_MESSAGE: "setMessage",
    ADD_COMMENT:"addComment",
    DELETE_COMMENT:"deleteComment",
    CLEAR_UPLOAD: 'clearUpload',
    ERROR_UPLOAD: 'errorUpload'
};

const MessageType = {
    ERROR: 'error',
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info'
};

export {apiUrl, mockUrl, devUrl, localUrl,
    UserActionType, TokenActionType, APIModules,
    UserType, AuthorityLevel,PostType,
    MsgType, MessageType
};

