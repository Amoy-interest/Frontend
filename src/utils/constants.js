const devUrl = 'http://52.90.204.208:8080';
const devUrl2='http://106.14.19.68';
// const devUrl2='http://120.55.194.144:8082/';
const devUrl3='http://106.14.19.68';
const mockUrl = 'http://47.98.185.162:7300/mock/5f0eb1a258dbdc84af53cdbb/Amoy';
const localUrl = 'http://localhost:8082';
const apiUrl = devUrl3;

const defaultImgUrl = "https://amoy-interest-oss.oss-cn-shenzhen.aliyuncs.com/amoy-interest/images/common/topic_logo.jpg";

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
    SEARCH: '/search',
    SIM:'/sim',
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
    SEARCH:6,
    SIMILAR:7
};

const MsgType = {
    SET_MESSAGE: "setMessage",
    ADD_POST: "addPost",
    ADD_COMMENT:"addComment",
    DELETE_COMMENT:"deleteComment",
    CLEAR_UPLOAD: 'clearUpload',
    ERROR_UPLOAD: 'errorUpload',
    REPORT_FINISHED: 'reportFinish',
    ADMIN: {
        REFRESH_TABLE: 'refreshTable',
        FORBID_USR: 'forbidUser',
        BAN_USR: 'banUser',
        UNBAN_USR:'unbanUser',
        PERMIT_USR:'permitUser',
        DELETE_POST:'deletePost',
        PASS_POST:'passPost',
        PASS_TOPIC:'passTopic',
        ADD_TOPIC:'addTopic',
        DELETE_TOPIC:'deleteTopic',
        EDIT_SENSE_WORD:'editSenseWord',
        DELETE_SENSE_WORD:'deleteSenseWord',
        ADD_SENSE_WORD:'addSenseWord'
    }
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
    MsgType, MessageType, defaultImgUrl
};

