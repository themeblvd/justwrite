import axios from 'axios';
import Validate from '../utils/Validate';
import { postsEndpoint } from '../config';

// Pre-configure secure request header.

const postsAxios = axios.create();

postsAxios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));
    config.headers.Authorization = `Bearer ${user.token}`;
    return config;
});

// Initial State

const initialState = {
    list: [],
    action: 'add-new' // add-new, update, publish
};

// Action Types

const UPDATE_POSTS = 'UPDATE_POSTS';

const UPDATE_ACTION = 'UPDATE_ACTION';

// Reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_POSTS:
            return {
                ...state,
                list: action.posts
            };

        case UPDATE_ACTION:
            return {
                ...state,
                action: action.value
            };

        default:
            return state;
    }
}

// Actions

function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        posts
    };
}

export function updateAction(value) {
    return {
        type: UPDATE_ACTION,
        value
    };
}

// Action Triggers

export function loadPosts(query = {}) {
    return dispatch => {
        var user = JSON.parse(localStorage.getItem('user'));
        var apiUrl = Validate.stripSlash(user.website) + '/' + postsEndpoint;

        query = {
            per_page: 12,
            context: 'edit',
            ...query
        };

        query = Validate.queryArgs(query);

        if (query) {
            apiUrl = apiUrl + '?' + query;
        }

        postsAxios
            .get(apiUrl)
            .then(response => {
                dispatch(updatePosts(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
}
