import axios from 'axios';
import Validate from '../utils/Validate';
import { usersEndpoint } from '../config';

// Pre-configure secure request header.

const profileAxios = axios.create();

profileAxios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));
    config.headers.Authorization = `Bearer ${user.token}`;
    return config;
});

// Initial State

const initialState = {
    id: '',
    username: '',
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    url: '',
    description: '',
    link: '',
    nickname: '',
    avatar: ''
};

// Action Types

const GET_PROFILE = 'GET_PROFILE';

// Reducer

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                ...action.data
            };

        default:
            return state;
    }
}

// Action Functions

function getProfile(data) {
    return {
        type: GET_PROFILE,
        data
    };
}

// Trigger Functions

export function loadProfile() {
    return dispatch => {
        var user = JSON.parse(localStorage.getItem('user'));
        var apiUrl = Validate.stripSlash(user.website) + '/' + usersEndpoint;

        return profileAxios
            .get(`${apiUrl}?search=${user.user_nicename}`)
            .then(response => {
                return profileAxios.get(
                    `${apiUrl}/${response.data[0].id}?context=edit`
                );
            })
            .then(response => {
                var data = {
                    id: response.data.id,
                    username: response.data.username,
                    name: response.data.name,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    email: response.data.email,
                    url: response.data.url,
                    description: response.data.description,
                    link: response.data.link,
                    nickname: response.data.nickname,
                    avatar: response.data.avatar_urls[96]
                        ? response.data.avatar_urls[96]
                        : ''
                };

                dispatch(getProfile(data));
            })
            .catch(error => {
                console.log(error);
            });
    };
}
