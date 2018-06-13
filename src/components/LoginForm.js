import React, { Component } from 'react';

// Utilities
import { animationDuration } from '../config';
import { validateLoginForm } from '../utils/validate';
import classNames from 'classnames';

// Store
import { connect } from 'react-redux';
import { login } from '../store/auth';
import { startLoading } from '../store/status';

// Routing
import { Redirect, withRouter, Link } from 'react-router-dom';

// Components
import Button from './Button';
import LogoutLink from './LogoutLink';
import LoginInfo from './LoginInfo';
import LoginToSandbox from './LoginToSandbox';

/**
 * Login Form
 *
 * @TODO I'm very much open to suggestions on
 * how to improve this component's state management
 * and organization.
 */
class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      doRedirect: false,
      inputs: {
        website: '',
        username: '',
        password: ''
      },
      fieldClasses: {
        website: '',
        username: '',
        password: ''
      },
      errors: {
        website: null,
        username: null,
        password: null
      }
    };
  }

  /**
   * Handle general validation.
   *
   * This method is a bit convaluted because
   * it gets used in different scenarios.
   *
   * It's envoked on individual form fields
   * upon changing (onBlur) and on the entire
   * form upon submission.
   *
   * @see /src/utils/validate.js
   */
  handleValidate = event => {
    if (this.state.isLoading) {
      return false;
    }

    // Handle validation passed from submit event.
    if (event.type == 'submit') {
      var errors = validateLoginForm(this.state.inputs);

      this.setState({
        fieldClasses: {
          website: classNames({
            'field-error': errors.website,
            'error-shake': errors.website
          }),
          username: classNames({
            'field-error': errors.username,
            'error-shake': errors.username
          }),
          password: classNames({
            'field-error': errors.password,
            'error-shake': errors.password
          })
        },
        errors: errors
      });

      // Remove any 'error-shake' classes after animation is done.
      setTimeout(() => {
        this.setState({
          fieldClasses: {
            website: classNames({
              'field-error': errors.website
            }),
            username: classNames({
              'field-error': errors.username
            }),
            password: classNames({
              'field-error': errors.password
            })
          }
        });
      }, animationDuration.errorShake);

      return errors;
    }

    // Handle validation for each individual form field, when focused off.
    var name = event.target.name;
    var error = validateLoginForm(name, this.state.inputs[name]);

    this.setState(prevState => ({
      fieldClasses: {
        ...prevState.fieldClasses,
        [name]: classNames({
          'field-error': error,
          'error-shake': error
        })
      },
      errors: {
        ...prevState.errors,
        [name]: error
      }
    }));

    if (error) {
      setTimeout(() => {
        this.setState(prevState => ({
          fieldClasses: {
            ...prevState.fieldClasses,
            [name]: 'field-error' // remove "error-shake"
          }
        }));
      }, animationDuration.errorShake);
    }
  };

  /**
   * Handle individual input changes, binded
   * to onChange.
   *
   * Note: Field validation is NOT handled
   * here, but instead with handleValidate(),
   * which is binded to the onBlur event.
   */
  handleChange = event => {
    var { name, value } = event.target;

    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: value
      }
    }));
  };

  /**
   * Handle form submission.
   *
   * This passes form data through handleValidate()
   * even though in theory the data should be
   * already validated individually for each
   * field.
   */
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.isLoading) {
      return false; // Don't let user click submit again, while processing.
    }

    var errors = this.handleValidate(event);
    var isValid = true;

    // If there are any errors, bail out.
    for (let prop in errors) {
      if (errors[prop]) {
        isValid = false;
      }
    }

    if (isValid) {
      var creds = {
        username: this.state.inputs.username,
        password: this.state.inputs.password
      };

      this.setState({ isLoading: true });

      this.props
        .login(this.state.inputs.website, creds)
        .then(() => {
          this.setState({
            isLoading: false,
            inputs: {
              website: '',
              username: '',
              password: ''
            }
          });

          if (this.props.isAuthenticated) {
            this.props.startLoading('app');
            setTimeout(() => {
              this.props.history.push('/');
            }, animationDuration.fadeApp);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  /**
   * Displays individual field error message.
   */
  errorMsg = field => {
    var msg = this.state.errors[field];
    return msg ? <span className="error-msg">{msg}</span> : null;
  };

  /**
   * Render component.
   *
   * @return {Component}
   */
  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return (
        <p className="alread-logged-in">
          You are already logged in.<br />
          <LogoutLink /> or <Link to="/">go to your dashboard</Link>.
        </p>
      );
    }

    return (
      <React.Fragment>
        <LoginInfo />
        <form className="login-form" onSubmit={this.handleSubmit} noValidate>
          {this.props.error.login && <p className="form-error">{this.props.error.login}</p>}

          <p className={this.state.fieldClasses.website}>
            <label htmlFor="website">WordPress Website URL</label>
            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://"
              value={this.state.inputs.website}
              onChange={this.handleChange}
              onBlur={this.handleValidate}
            />
            {this.errorMsg('website')}
          </p>
          <p className={this.state.fieldClasses.username}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={this.state.inputs.username}
              onChange={this.handleChange}
              onBlur={this.handleValidate}
            />
            {this.errorMsg('username')}
          </p>
          <p className={this.state.fieldClasses.password}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={this.state.inputs.password}
              onChange={this.handleChange}
              onBlur={this.handleValidate}
            />
            {this.errorMsg('password')}
          </p>
          <Button isPrimary isLoading={this.state.isLoading}>
            {this.state.isLoading ? 'Logging In...' : 'Log In'}
          </Button>
          <LoginToSandbox />
        </form>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => state.auth,
    { login, startLoading }
  )(LoginForm)
);
