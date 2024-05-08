import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger"; //it is replaced with loggerMiddleWare that I made
import { loggerMiddleWare } from "./middleware/logger";
import {persistStore, persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
// import { thunk } from "redux-thunk"; //cannot be with redux-saga
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

const persistConfig = {
    key: 'root', //persist whole thing
    storage, //same as storage: storage since the name and value are the same,
    whitelist: ['cart'],
    //blacklist: ['user'] //I don't want to save the user info
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [process.env.NODE_ENV !== 'production' && loggerMiddleWare, sagaMiddleware/*thunk*/]
                    .filter(Boolean); //filter out if it's boolean (when it's not development environment)

const composeEnhancer = (process.env.NODE_ENV !== 'production' && 
                        window && 
                        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) //setting for redux devtools chrome extension
                        || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);