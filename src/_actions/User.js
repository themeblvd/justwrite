class User {
    /**
     * Validate user and login.
     *
     * @var {Object} app           Instance of App component.
     * @var {Object} user          User data.
     * @var {String} user.website  WordPress website URL.
     * @var {String} user.username WordPress username.
     * @var {String} user.password WordPress password.
     */
    login(app, user) {
        // @TODO
        app.setState({
            isLoggedIn: true
        });
    }

    /**
     * Logout user.
     */
    logout(app) {
        // @TODO
        app.setState({
            isLoggedIn: false
        });
    }
}

export default User;
