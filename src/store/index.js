import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth';
import status from './status';
import profile from './profile';
// import posts from "./posts"; @TODO

const reducer = combineReducers({
    // posts, @TODO
    status,
    auth,
    profile
});

export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
