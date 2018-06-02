import axios from 'axios';
import Validate from '../utils/Validate';
import { endpoints } from '../config';

// Pre-configure secure request header.

const postsAxios = axios.create();

postsAxios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));
    config.headers.Authorization = `Bearer ${user.token}`;
    return config;
});

// Initial State

const initialState = {
    action: 'add-new', // add-new, update, publish
    list: [],
    totalPages: 0,
    currentPage: 1,
    current: null,
    authors: [],
    tags: [],
    categories: []
};

// Action Types

const UPDATE_ACTION = 'UPDATE_ACTION';

const UPDATE_AUTHORS = 'UPDATE_AUTHORS';

const UPDATE_TAGS = 'UPDATE_TAGS';

const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';

const UPDATE_POSTS = 'UPDATE_POSTS';

const UPDATE_TOTAL_PAGES = 'UPDATE_TOTAL_PAGES';

const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';

const EDIT_POST = 'EDIT_POST';

const SAVE_POST = 'SAVE_POST';

// const SAVE_NEW_POST = 'SAVE_NEW_POST'; // @TODO

const CLEAR_POSTS = 'CLEAR_POSTS';

const CLEAR_EDIT_POST = 'CLEAR_EDIT_POST';

// Reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_ACTION:
            return {
                ...state,
                action: action.value
            };

        case UPDATE_AUTHORS:
            return {
                ...state,
                authors: action.authors
            };

        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };

        case UPDATE_TAGS:
            return {
                ...state,
                tags: action.tags
            };

        case UPDATE_POSTS:
            return {
                ...state,
                list: action.posts
            };

        case UPDATE_TOTAL_PAGES:
            return {
                ...state,
                totalPages: parseInt(action.num)
            };

        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: parseInt(action.num)
            };

        case EDIT_POST:
            return {
                ...state,
                current: action.post
            };

        case CLEAR_POSTS:
            return {
                ...state,
                list: []
            };

        case CLEAR_EDIT_POST:
            return {
                ...state,
                current: null
            };

        default:
            return state;
    }
}

// Actions

export function updateAction(value) {
    return {
        type: UPDATE_ACTION,
        value
    };
}

function updateAuthors(authors) {
    return {
        type: UPDATE_AUTHORS,
        authors
    };
}

function updateCategories(categories) {
    return {
        type: UPDATE_CATEGORIES,
        categories
    };
}

function updateTags(tags) {
    return {
        type: UPDATE_TAGS,
        tags
    };
}

function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        posts
    };
}

function updateTotalPages(num) {
    return {
        type: UPDATE_TOTAL_PAGES,
        num
    };
}

export function updateCurrentPage(num) {
    return {
        type: UPDATE_CURRENT_PAGE,
        num
    };
}

function editPost(post) {
    return {
        type: EDIT_POST,
        post
    };
}

function savePost() {
    // ...
}

export function clearPosts() {
    return {
        type: CLEAR_POSTS
    };
}

export function clearEditPost() {
    return {
        type: CLEAR_EDIT_POST
    };
}

// Action Dispatchers

export function loadPostData(endpoint, params = {}) {
    return dispatch => {
        var user = JSON.parse(localStorage.getItem('user'));
        var apiUrl = Validate.stripSlash(user.website) + '/' + endpoints[endpoint]; // prettier-ignore

        if (endpoint === 'posts') {
            params = {
                per_page: 12,
                context: 'edit',
                ...params
            };

            if (params.page) {
                dispatch(updateCurrentPage(params.page));
            }
        }

        return postsAxios
            .get(apiUrl, { params })
            .then(response => {
                switch (endpoint) {
                    case 'authors':
                        dispatch(updateAuthors(response.data));
                        break;
                    case 'categories':
                        dispatch(updateCategories(response.data));
                        break;
                    case 'tags':
                        dispatch(updateTags(response.data));
                        break;
                    default:
                        dispatch(updateTotalPages(response.headers['x-wp-totalpages'])); // prettier-ignore
                        dispatch(updatePosts(response.data));
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
}

export function loadPost(postID) {
    return dispatch => {
        var user = JSON.parse(localStorage.getItem('user'));
        var apiUrl = Validate.stripSlash(user.website) + '/' + endpoints.posts; // prettier-ignore

        return postsAxios
            .get(apiUrl + `/${postID}?context=edit`)
            .then(response => {
                dispatch(editPost(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
}

export function savePost(postID, data) {
    return dispatch => {
        var user = JSON.parse(localStorage.getItem('user'));
        var apiUrl = Validate.stripSlash(user.website) + '/' + endpoints.posts; // prettier-ignore

        return postsAxios
            .put(apiUrl + `/${postID}`, data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };
}
