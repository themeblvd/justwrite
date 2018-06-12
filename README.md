# Just Write

[Just Write](https://justwrite.app) is a client-side web application built in [React](https://reactjs.org/). It allows a user from any WordPress website to log in and manage posts via its REST API. The project structure and build process come from my personal [React boilerplate](https://github.com/themeblvd/react-boilerplate).

![](https://raw.githubusercontent.com/themeblvd/justwrite/master/screenshot-1.png)

## Using the Application

In order for a user to log in through the application, their WordPress website needs to be secured on `https` and have the [JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) plugin set up.

## How it Works

It's important to note that *Just Write* is simply a client-side application, with no backend. When a user logs in, a `POST` request is sent to their WordPress website to generate a [JWT authentication token](https://jwt.io/). If successful, *Just Write* then saves this token to the user's local browser storage.

Every time *Just Write* loads, this token is verified through the WordPress API to maintain the user's logged-in state within the application. This authentication token is then sent in the Header with every API request to WordPress, giving the user the ability to edit content of the website.

## Developing the Application

If you'd like to fork or clone the project, after installing all of the node modules, here are the project's relevant commands:

* `npm run start` - Start development server, watch for changes & continuously build into the `/public` directory.
* `npm run build:prod` - Re-build the `/public` directory for production.

## Screenshots

### Dashboard Home

![](https://raw.githubusercontent.com/themeblvd/justwrite/master/screenshot-2.png)

### Edit Profile Modal

![](https://raw.githubusercontent.com/themeblvd/justwrite/master/screenshot-4.png)

### Edit Post Screen

![](https://raw.githubusercontent.com/themeblvd/justwrite/master/screenshot-3.png)

## Creator

**Jason Bobich**

* <http://jasonbobich.com>
* <https://twitter.com/jasonbobich>
* <http://themeblvd.com>
* <http://wpjumpstart.com>
