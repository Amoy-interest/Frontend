import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';//devToolsEnhancer,

import {history} from "../utils/history";
import { routerMiddleware } from 'connected-react-router'

// redux-persist
const persistConfig = {
    key: 'Amoy Interest',
    storage: storage,
    stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};
const myPersistReducer = persistReducer(persistConfig, reducers);

// redux Middleware
const middleWareEnhancer = applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history),
    createLogger({collapsed:true})
);

// redux-devtools
const enhancer = composeWithDevTools(middleWareEnhancer);

function configureStore(preloadedState) {
    return createStore(
        myPersistReducer,
        preloadedState,
        enhancer
    )
}

export const store = configureStore();
export const persist = persistStore(store);
