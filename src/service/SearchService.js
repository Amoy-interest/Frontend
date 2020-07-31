import {APIModules, apiUrl} from "../utils/constants";
import {getRequest} from "../utils/ajax";

export const getPreSearch = (params,callback) => {
    const url = `${apiUrl}${APIModules.SEARCH}/pre`;
    getRequest(url,params,callback);
};
