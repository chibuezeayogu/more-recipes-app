import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../action/actionCreators';
import { validateSignInForm } from '../util/validateInputs';
import Menu from './Header/Menu.jsx';
import Footer from './Footer/Footer.jsx';

/**
 * SignIn component for user to signin
 *
 * @class
 *
 * @extends Component
 *
 */
export class SignIn extends Component {
  /**
   *
   * @description initialize state
   *
   * @constructor
   *
   * @memberOf SignIn
   *
   * @returns {void}
   *
   */
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @description routes to /recipes if user is authenticated
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @returns {void}
   *
   */
  componentWillMount() {
    if (this.props.userData.isAuthenticated) {
      this.props.history.push('/recipes');
    }
  }

  /**
   * @description routes to /recipes if user is authenticated
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @param {Object} nextProps
   *
   * @returns {undifined}
   *
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.userData.isAuthenticated) {
      this.props.history.push('/recipes');
    }
  }

  /**
   *
   * @description Set the state of user input
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @param {object} event
   *
   * @returns {undifined}
   *
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description submits form
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @param {Object} event
   *
   * @returns {void}
   *
   */
  handleOnsubmit(event) {
    event.preventDefault();
    const err = validateSignInForm(this.state);
    if (err.isError) {
      return this.setState({ errors: err.errors });
    }
    const { email, password } = this.state;
    this.props.login(email, password);
  }

   /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @returns {undifiend} 
   *
   */
  render() {
    return (
      <div className="body">
        <Menu />
        <div className="main">
          <div className="login-form z-depth-4">
            <h4 className="center">Welcome Back</h4>
            <hr />
            <form
              className="col l6 m8 s12 offset-l3 offset-m2"
              onSubmit={event => this.handleOnsubmit(event)}
            >
              <div className="row">
                <div className="input-field col s12">
                  <i className="fa fa-envelope prefix" aria-hidden="true" />
                  <input
                    id="email"
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="email" className="active">Email</label>
                </div>
                <span className="red-text right error-font">
                  {this.state.errors.emailError}
                </span>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="fa fa-key prefix" aria-hidden="true" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                  <label htmlFor="password" className="active">Password</label>
                </div>
                <span className="red-text right error-font">
                  {this.state.errors.passwordError}
                </span>
              </div>
              <div className="row">
                <button
                  className="btn right green form-margin"
                  type="submit"
                  name="action"
                >Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SignIn.propTypes = {
  userData: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps, { login })(SignIn);
