import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger"; //it is replaced with loggerMiddleWare that I made

import { rootReducer } from "./root-reducer";

const loggerMiddleWare = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
}

const middlewares = [loggerMiddleWare];

const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);