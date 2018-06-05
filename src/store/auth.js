import axios from 'axios';
import { stripSlash } from '../utils/formatting';
import { endpoints } from '../config';

// Pre-configure secure request header.

const authAxios = axios.create();

authAxios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));
    config.headers.Authorization = `Bearer ${user.token}`;
    return config;
});

// Initial State

const initialState = {
    hasVerified: false,
    website: '',
    userDisplayName: '',
    userEmail: '',
    userNicename: '',
    isAuthenticated: false,
    error: {
        login: '',
        verify: ''
    }
};

// Action Types

const AUTHENTICATE = 'AUTHENTICATE';

const AUTH_ERROR = 'AUTH_ERROR';

const LOGOUT = 'LOGOUT';

// Reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                website: action.website,
                userDisplayName: action.userDisplayName,
                userEmail: action.userEmail,
                userNicename: action.userNicename,
                isAuthenticated: true,
                hasVerified: true
            };

        case AUTH_ERROR:
            return {
                ...state,
                error: {
                    ...state.error,
                    [action.key]: action.message
                },
                hasVerified: true
            };

        case LOGOUT:
            return {
                ...initialState,
                hasVerified: true
            };

        default:
            return state;
    }
}

// Action Functions

function authenticate(user) {
    return {
        type: AUTHENTICATE,
        website: user.website,
        userDisplayName: user.user_display_name,
        userEmail: user.user_email,
        userNicename: user.user_nicename
    };
}

function authError(key, message) {
    return {
        type: AUTH_ERROR,
        key,
        message
    };
}

export function logout(event) {
    event.preventDefault();
    document.body.classList.remove('user-menu-on');
    localStorage.removeItem('user');

    return {
        type: LOGOUT
    };
}

export function login(website, creds) {
    return dispatch => {
        var url = stripSlash(website) + '/' + endpoints.login;

        return axios
            .post(url, { username: creds.username, password: creds.password })
            .then(response => {
                var user = {
                    ...response.data,
                    website: website
                };

                localStorage.setItem('user', JSON.stringify(user));

                dispatch(authenticate(user));
            })
            .catch(error => {
                dispatch(authError('login', 'Could not log in.'));
            });
    };
}

export function verify() {
    return dispatch => {
        var user = JSON.parse(localStorage.getItem('user')),
            token = user && user.token;

        // If no user data is stored, we'll just bail out.
        if (!token || !user) {
            return new Promise(function(resolve, reject) {
                dispatch(authError('verify', 'Not logged in.'));
                resolve();
            });
        }

        var apiUrl = stripSlash(user.website) + '/' + endpoints.verify;

        return authAxios
            .post(apiUrl)
            .then(response => {
                if (response.data.code) {
                    if (response.data.code === 'jwt_auth_valid_token') {
                        dispatch(authenticate(user));
                    }
                }
            })
            .catch(error => {
                dispatch(authError('verify', 'Could not verify user data.'));
            });
    };
}
