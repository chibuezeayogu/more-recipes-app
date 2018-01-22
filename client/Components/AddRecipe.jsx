require('dotenv').config();

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { createRecipe } from '../action/actionCreators';
import SmallPreloader from './SmallPreloader.jsx';
import Footer from './Footer/Footer.jsx';
import UserMenu from './Header/UserMenu.jsx';
import { validateAddRecipe } from '../middleware/validateInputs';

const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

/**
 * @description AddRecipe component for user to create a new recipe
 *
 * @class
 *
 * @extends Component
 *
 */
class AddRecipe extends Component {
   /**
   * @description initialize state and binds functiom
   *
   * @constructor
   *
   * @memberOf AddRecipe
   *
   * @returns {void}
   *
   */
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      ingredients: '',
      procedures: '',
      imageUrl: '',
      image: {},
      errors: {},
      disabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOnsubmit = this.handleOnsubmit.bind(this);
  }

   /**
   * @description routes to /recipes if user is authenticated
   *
   * @method
   *
   * @memberOf AddRecipe
   *
   * @returns {void}
   *
   */
  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.props.history.push('/signin');
    }
  }
   /**
   * @description routes to /recipes if user is authenticated
   *
   * @method
   *
   * @memberOf AddRecipe
   *
   * @param {Object} nextProps
   *
   * @returns {void}
   *
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipeReducer.isCreated) {
      this.props.history.push('/recipes');
    }
  }


  handleChange(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * @description get image input and add to state
   *
   * @method
   *
   * @memberOf AddRecipe
   *
   * @param {Event} e
   *
   * @returns {void}
   */
  handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    this.setState({ errors: {}, image: {} });
    this.setState({ image: file });
  }

  /**
   *
   * @description submits form
   *
   * @method
   *
   * @memberOf AddRecipe
   *
   * @param {Event} e
   *
   * @returns {void}
   *
   */
  handleOnsubmit(e) {
    e.preventDefault();
    const err = validateAddRecipe(this.state);
    if (err.isError) {
      return this.setState({ errors: err.errors });
    }

    this.setState({ disabled: true });
    const formData = new FormData();
    formData.append('file', this.state.image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      data: formData,
    }).then((data) => {
      this.setState({ imageUrl: data.data.secure_url, disabled: false });
      const {
        title, description, ingredients, procedures, imageUrl,
      } = this.state;
      console.log(imageUrl, 'image');
      this.props.createRecipe(title, description, ingredients, procedures, imageUrl);
    }).catch(() => { 
      this.setState({ disabled: false });
      Materialize.toast("Error! Please try again", 4000, 'red');
    });
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf SignUp
   *
   * @returns {void}
   *
   */
  render() {
    return (
      <div className="body grey lighten-5">
        <UserMenu />
        <div className="main">
          <div className="container">
            <div className="addrecipe-form z-depth-4">
              <div className="col l6 m8 s12 offset-l6 offset-m4">
                <h4 className="center">Add Recipe</h4>
                <hr />
              </div>
              <form onSubmit={this.handleOnsubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                    <label htmlFor="title" className="active">Title</label>
                  </div>
                  <span className="right red-text">
                    {this.state.errors.titleError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="description"
                      name="description"
                      type="text"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                    <label
                      htmlFor="description"
                      className="active"
                    >Description
                    </label>
                  </div>
                  <span className="right red-text">
                    {this.state.errors.descriptionError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      value={this.state.ingredients}
                      onChange={this.handleChange}
                      placeholder="enter ingredients seperated by semicolon(;)"
                    />
                  </div>
                  <span className="right red-text">
                    {this.state.errors.ingredientsError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      id="procedures"
                      name="procedures"
                      value={this.state.password}
                      onChange={this.handleChange}
                      placeholder="enter procedures seperated by semicolon(;)"
                    />
                  </div>
                  <span className="right red-text">
                    {this.state.errors.proceduresError}
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
                  <span className="right red-text">
                    {this.state.errors.imageError}
                  </span>
                </div>
                <div className="row">
                  <button
                    className="btn right green"
                    type="submit"
                    name="action"
                  >Post
                  </button>
                </div>
                <hr />
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

AddRecipe.propTypes = {
  createRecipe: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  recipeReducer: PropTypes.shape({
    isCreated: PropTypes.bool.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  recipeReducer: state.recipeReducer,
});

export default connect(mapStateToProps, { createRecipe })(AddRecipe);

