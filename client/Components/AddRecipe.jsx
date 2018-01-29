

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { createRecipe } from '../action/actionCreators';
import SmallPreloader from './SmallPreloader.jsx';
import Footer from './Footer/Footer.jsx';
import UserMenu from './Header/UserMenu.jsx';
import imageToFormData from '../util/ImageUpload';
import { validateAddRecipeForm } from '../util/validateInputs';

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

/**
   * @description Set the state of user input
   *
   * @method
   *
   * @memberOf SignUp
   *
   * @param {Event} event - event object
   *
   * @returns {void}
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description get image input and add to state
   *
   * @method
   *
   * @memberOf AddRecipe
   *
   * @param {Event} event - event object
   *
   * @returns {void}
   */
  handleImageChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
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
   * @param {Event} event 
   *
   * @returns {void}
   *
   */
  handleOnsubmit(event) {
    event.preventDefault();
    const err = validateAddRecipeForm(this.state);
    if (err.isError) {
      return this.setState({ errors: err.errors });
    }
    this.setState({ disabled: true });
    const uploadData = imageToFormData(this.state.image);
    delete axios.defaults.headers.common['Authorization'];

    axios(uploadData)
      .then((data) => {
      this.setState({ imageUrl: data.data.secure_url });
      this.props.createRecipe(this.state);
    }).catch((error) => { 
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
            <div className="addrecipe-form ">
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
                  <span className="right red-text error-margin">
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
                      style={{ wordWrap: 'break-word' }}
                    />
                    <label
                      htmlFor="description"
                      className="active"
                    >Description
                    </label>
                  </div>
                  <span className="right red-text error-margin">
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
                  <span className="right red-text error-margin">
                    {this.state.errors.ingredientsError}
                  </span>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <textarea
                      id="procedures"
                      name="procedures"
                      value={this.state.procedures}
                      onChange={this.handleChange}
                      placeholder="enter procedures seperated by semicolon(;)"
                    />
                  </div>
                  <span className="right red-text error-margin">
                    {this.state.errors.proceduresError}
                  </span>
                </div>
                <div className="row">
                  <div 
                    className="file-field input-field" 
                    style={{ marginLeft: 10, marginRight: 10 }}>
                    <div className="btn green">
                      <span> 
                        <i className="material-icons">insert_photo
                        </i>
                      </span>
                      <input 
                        type="file" 
                        multiple 
                        onChange={event => this.handleImageChange(event)} />
                    </div>
                    <div className="file-path-wrapper">
                      <input 
                        className="file-path validate" 
                        type="text" 
                        placeholder="Upload recipe image" />
                    </div>
                    <span className="right red-text error-margin">
                    {this.state.errors.imageError}
                  </span>
                  </div>
                </div>
                <div className="row">
                  <button
                    className="btn right green"
                    type="submit"
                    name="action"
                    disabled={this.state.disabled}
                    style={{ marginRight: 10 }}
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

