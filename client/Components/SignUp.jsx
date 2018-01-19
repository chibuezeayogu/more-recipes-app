require('dotenv').config();

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { createAccount } from '../action/actionCreators';
import { validateSignUp } from './middleware/validateInputs';
import Menu from './Hearder/Menu.jsx';
import Footer from './Footer/Footer.jsx';

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

/**
 * SignUp component for user to create an account
 * @class
 * @extends Component
 */
class SignUp extends Component {
  /**
   * @description initialize state and binds functiom
   * @constructor
   * @memberOf SignUp
   * @returns {void}
   */
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      imageUrl: '',
      image: {},
      errors: {},
      disabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @description routes to /recipes if user is authenticated
   * @method
   * @memberOf SignIn
   * @returns {void}
   */
  componentWillMount() {
    const Token = localStorage.getItem('jwtToken');
    if (Token) {
      this.props.history.push('/recipes');
    }
  }

  /**
   * @description routes to /recipes if user is authenticated
   * @method
   * @memberOf SignUp
   * @param {Object} nextProps
   * @returns {void}
   */
  componentWillUpdate(nextProps) {
    if (nextProps.userData.isAuthenticated) {
      this.props.history.push('/recipes');
    }
  }

  /**
   * @description Set the state of user input
   * @method
   * @memberOf SignUp
   * @param {Event} e
   * @returns {void}
   */
  handleChange(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * @description validates image input and sets image state
   * @method
   * @memberOf SignUp
   * @param {Event} e
   * @returns {void}
   */
  handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    this.setState({ errors: {}, image: {} });
    this.setState({ image: file });
  }

  /**
   * @description submits form
   * @method
   * @memberOf SignUp
   * @param {Event} e
   * @returns {void}
   */
  handleOnsubmit(e) {
    e.preventDefault();
    const err = validateSignUp(this.state);
    if (err.isError) {
      return this.setState({ errors: err.errors });
    }

    this.setState({ disabled: true });
    const formData = new FormData();
    formData.append('file', this.state.image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    axios.defaults.headers.common = null;
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      hearders: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    }).then((data) => {
      this.setState({ imageUrl: data.data.secure_url, disabled: false });
      const {
        firstName,
        lastName,
        email,
        password,
        imageUrl
      } = this.state;
      this.props.createAccount(firstName, lastName, email, password, imageUrl);
    });
  }

   /**
   *
   * @description renders JSX element
   * @method
   * @memberOf SignIn
   * @returns {void}
   */
  render() {
    return (
      <div className="body">
        <Menu />
        <div className="main">
          <div className="signup-form z-depth-4">
            <div className="col l6 m8 s12 offset-l6 offset-m4">
              <h4 className="center">Create Account</h4>
              <hr />
              <form
                className="col l6 m8 s12 offset-l3 offset-m2"
                onSubmit={e => this.handleOnsubmit(e)}
              >
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="firstName" className="active">
                      First Name
                    </label>
                  </div>
                  <span className="right red-text error-font">
                    {this.state.errors.firstNameError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="lastName" className="active">
                      Last Name
                    </label>
                  </div>
                  <span className="right red-text error-font">
                    {this.state.errors.lastNameError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">mail_outline</i>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="email" className="active">Email</label>
                  </div>
                  <span className="right red-text error-font">
                    {this.state.errors.emailError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">vpn_key</i>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      autoComplete="off"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <span className="right red-text error-font">
                    {this.state.errors.passwordError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">insert_photo</i>
                    <input
                      type="file"
                      name="profileImage"
                      onChange={e => this.handleImageChange(e)}
                    />
                  </div>
                  <span className="right red-text error-font">
                    {this.state.errors.imageError}
                  </span>
                </div>
                <hr />
                <div className="row right">
                  <button
                    className="btn right green"
                    type="submit"
                    name="action"
                  >Sign Up
                    <i className="material-icons right">send</i>
                  </button>
                </div>
                <div className="row">
                  <div>
                    {this.state.disabled ?
                      <SmallPreloader />
                    :
                    ''
                    }
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SignUp.propTypes = {
  userData: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  createAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps, { createAccount })(SignUp);
