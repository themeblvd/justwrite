import { animationDuration } from '../config';

/**
 * Timeout Promse
 *
 * This allows us to change timeouts together
 * with a promise.
 *
 * @param {Number}   delay    Time delay in milliseconds.
 * @param {Function} callback Callback function on timeout.
 */
export function timeoutPromise(delay, callback) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, delay);
    });
}

/**
 * Show a modal.
 *
 * @param {Number} type Type of modal.
 */
export function showModal(type) {
    const body = document.body;

    if (type == 'profile') {
        body.classList.remove('user-menu-on');
    }

    body.classList.add(`${type}-show`);

    setTimeout(() => {
        body.classList.add(`${type}-animate-in`);
    }, 20);
}

/**
 * Hide a modal.
 *
 * @param {Number} type Type of modal.
 */
export function hideModal(type) {
    const body = document.body;

    body.classList.add(`${type}-animate-out`);

    setTimeout(() => {
        body.classList.remove(
            `${type}-animate-in`,
            `${type}-animate-out`,
            `${type}-show`
        );
    }, animationDuration.fadeProfile);
}
