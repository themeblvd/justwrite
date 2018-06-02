var apiExtension = 'wp-json';

export const endpoints = {
    login: `${apiExtension}/jwt-auth/v1/token`,
    verify: `${apiExtension}/jwt-auth/v1/token/validate`,
    users: `${apiExtension}/wp/v2/users`,
    posts: `${apiExtension}/wp/v2/posts`,
    tags: `${apiExtension}/wp/v2/tags`,
    cats: `${apiExtension}/wp/v2/categories`
};

export const animationDuration = {
    errorShake: 250,
    fadeApp: 500,
    toggleUserMenu: 500
};
