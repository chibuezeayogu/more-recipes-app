import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../action/actionCreators';
import { validateSignIn } from '../middleware/validateInputs';
import Menu from './Hearder/Menu.jsx';
import Footer from './Footer/Footer.jsx';

/**
 * SignIn component for user to signin
 *
 * @class
 *
 * @extends Component
 *
 */
class SignIn extends Component {
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
    const Token = localStorage.getItem('jwtToken');
    if (Token) {
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
   * @returns {void}
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
   * @param {Event} e
   *
   * @returns {void}
   *
   */
  handleChange(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * @description submits form
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @param {Event} e
   *
   * @returns {void}
   *
   */
  handleOnsubmit(e) {
    e.preventDefault();
    const err = validateSignIn(this.state);
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
   * @returns {void}
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
              onSubmit={e => this.handleOnsubmit(e)}
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
                  className="btn right green"
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
