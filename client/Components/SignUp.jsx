require('dotenv').config();

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { createAccount } from '../action/actionCreators';
import { validateSignUpForm } from '../util/validateInputs';
import Menu from './Header/Menu.jsx';
import Footer from './Footer/Footer.jsx';
import SmallPreloader from './SmallPreloader.jsx';
import imageToFormData from '../util/ImageUpload';

/**
 * SignUp component for user to create an account
 *
 * @class
 *
 * @extends Component
 *
 */
export class SignUp extends Component {
  /**
   * @description initialize state and binds functiom
   *
   * @constructor
   *
   * @memberOf SignUp
   *
   * @returns {undefined}
   *
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
    this.handleOnsubmit = this.handleOnsubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  /**
   * @description routes to /recipes if user is authenticated
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @returns {undefined}
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
   * @memberOf SignUp
   *
   * @param {Object} nextProps - nextProps object
   *
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.userData.isAuthenticated) {
      this.props.history.push('/recipes');
    } else {
      this.setState({ disabled: false });
    }
  }

  /**
   * @description Set the state of user input
   *
   * @method
   *
   * @memberOf SignUp
   *
   * @param {Event} event - event object
   *
   * @returns {undefined}
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description validates image input and sets image state
   *
   * @method
   *
   * @memberOf SignUp
   *
   * @param {Event} event - event objectt
   *
   * @returns {undefined}
   *
   */
  handleImageChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({ errors: {}, image: {} });
    this.setState({ image: file });
  }

  /**
   * @description submits form
   *
   * @method
   *
   * @memberOf SignUp
   *
   * @param {Event} event - event object
   *
   * @returns {undefined}
   *
   */
  handleOnsubmit(event) {
    event.preventDefault();
    const err = validateSignUpForm(this.state);
    if (err.isError) {
      return this.setState({ errors: err.errors });
    }

    this.setState({ disabled: true });
    const uploadData = imageToFormData(this.state.image);
    delete axios.defaults.headers.common.Authorization;

    axios(uploadData)
      .then((data) => {
        this.setState({ imageUrl: data.data.secure_url });
        this.props.createAccount(this.state);
      }).catch(() => {
        this.setState({ disabled: false });
        Materialize.toast('Error! Please try again', 4000, 'red');
      });
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @returns {undefined} - renders JSX element
   *
   */
  render() {
    return (
      <div className="body">
        <Menu />
        <div className="main">
          <div className="signup-form z-depth-1">
            <div className="col l6 m8 s12 offset-l6 offset-m4">
              <h4 className="center">Create Account</h4>
              <hr />
              <form
                className="col l6 m8 s12 offset-l3 offset-m2"
                onSubmit={this.handleOnsubmit}
              >
                <div className="row">
                  <div className="input-field col s12">
                    <i className="fa fa-user-circle prefix" aria-hidden="true" />
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
                  <span className="right red-text error-font error-margin">
                    {this.state.errors.firstNameError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="fa fa-user-circle prefix" aria-hidden="true" />
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
                  <span className="right red-text error-font error-margin">
                    {this.state.errors.lastNameError}
                  </span>
                </div>
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
                  <span className="right red-text error-font error-margin">
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
                    <label htmlFor="password">Password</label>
                  </div>
                  <span className="right red-text error-font error-margin">
                    {this.state.errors.passwordError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="fa fa-picture-o prefix" aria-hidden="true" />
                    <input
                      id="image"
                      type="file"
                      name="profileImage"
                      onChange={this.handleImageChange}
                    />
                  </div>
                  <span className="right red-text error-font error-margin">
                    {this.state.errors.imageError}
                  </span>
                </div>
                <div className="row right">
                  <button
                    className="btn right green"
                    type="submit"
                    name="action"
                  > Sign Up
                  </button>
                </div>
                <div className="row center">
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
  createAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps, { createAccount })(SignUp);
