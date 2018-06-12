# Help

Here's some working information on using the *&lt;justwrite.app&gt;* application. We'll continue to improve this article as we move along. If you'd like to play around with *&lt;justwrite.app&gt;* without using your  actual WordPress site, feel free to click the "Play in the sandbox" link just below the login form.

## Accessing Your WordPress Website

##### How It Works

Conceptually, it's a probably a little weird to see a login screen on a random website that gives you access your own website. So after initially visiting *&lt;justwrite.app&gt;*, you may wondering, "Wait, can I login to *my* website?" Yes, you can!

And you may also be wondering, "Do I want to give some random website my login information?" So it may be helpful to understand how our application works. This is purely a frontend, client-side application with not backend.

What that means is when you submit your WordPress credentials, they aren't sent to us. Our application's login form submits data directly to the REST API of the WordPress site URL you give. If your credentials are verified by your website, then an authentication token is sent back and stored in your local web browser's storage. Then, sending this token with each request is how you're able to post to your WordPress site, moving forward.

##### Authenticating Yourself

And of course, there's a catch. There's always a catch, right?

Unfortunately, the WordPress REST API doesn't currently have any way of authenticating users outside of the WordPress admin. So in theory, the only way to gain authentication from a decoupled application like this would be to first have you login to your WordPress site so that our application could look to the cookie WordPress stored from the web browser you're currently using.

Well, this would be the only way without a third-party plugin, that is. There are third-party plugins out there that extend the WordPress API to work with various standardized authentication methods. Because it's all the rage right now, we've selected to go with using [JWT tokens](https://jwt.io).

##### Enabling JWT Authentication

So to allow *&lt;justwrite.app&gt;* to reach out to your website's API you'll need to have the [JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) plugin set up. This involves installing and activating the plugin from your WordPress site. Then, you'll need to add a couple of constants to your `wp-config.php`, as it explains in their documentation.

``` javascript
define('JWT_AUTH_SECRET_KEY', 'your-secrect-key');
define('JWT_AUTH_CORS_ENABLE', true);
```

*Note: You'll want to replace `your-secret-key` with something harder to crack. Picking any randomly generated salted hash string from [here](https://api.wordpress.org/secret-key/1.1/salt/) will do the trick.*

Also, make sure you're site is secured on SSL! This means that when you visit your website, it should be at `https` and not `http`. And if you haven't done this yet anyway, you should definitely [get on it](https://searchengineland.com/effective-july-2018-googles-chrome-browser-will-mark-non-https-sites-as-not-secure-291623).
