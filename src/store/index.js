import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import auth from './auth';
import status from './status';
import profile from './profile';
import posts from './posts';

const reducer = combineReducers({
    posts,
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
