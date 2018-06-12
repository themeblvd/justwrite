import packageJSON from '../package.json';

/**
 * Project information.
 */
export const project = {
    name: packageJSON.name,
    version: packageJSON.version,
    title: packageJSON.title,
    description: packageJSON.description,
    authorName: packageJSON.author.name,
    authorUrl: packageJSON.author.url,
    repo: packageJSON.repository.url.slice(0, -4) // Expecting .git at the end.
};

/**
 * Dashboard settings.
 */
export const dashboard = {
    perPage: 9
};

/**
 * Sandbox information.
 */
export const sandbox = {
    url: 'https://sandbox.justwrite.app',
    auth: 'https://justwrite.app/sandbox-auth.php'
};

/**
 * API endpoints.
 */
var apiExtension = 'wp-json';

export const endpoints = {
    login: `${apiExtension}/jwt-auth/v1/token`,
    verify: `${apiExtension}/jwt-auth/v1/token/validate`,
    users: `${apiExtension}/wp/v2/users`,
    posts: `${apiExtension}/wp/v2/posts`,
    tags: `${apiExtension}/wp/v2/tags`,
    categories: `${apiExtension}/wp/v2/categories`,
    authors: `${apiExtension}/wp/v2/users`
};

/**
 * Animation durations.
 *
 * These millisecond values are used in CSS, and
 * so this object lets us match our JavaScript
 * timing functions.
 */
export const animationDuration = {
    errorShake: 250,
    fadeApp: 500,
    toggleUserMenu: 500,
    fadeProfile: 250
};
