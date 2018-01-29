
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { editRecipe, getRecipe } from '../action/actionCreators';
import SmallPreloader from './SmallPreloader.jsx';
import Footer from './Footer/Footer.jsx';
import UserMenu from './Header/UserMenu.jsx';
import { validateEditRecipeForm, validateImage } from '../util/validateInputs';
import imageToFormData from '../util/ImageUpload';


/**
 * @description AddRecipe component for user to create a new recipe
 *
 * @class
 *
 * @extends Component
 *
 */
class EditRecipe extends Component {
   /**
   * @description initialize state and binds functiom
   *
   * @constructor
   *
   * @memberOf EditRecipe
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
      imageUrl:'',
      image: {},
      selectedImage: '',
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
   * @memberOf EditRecipe
   *
   * @returns {void}
   *
   */
  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.props.history.push('/signin');
    } else {
      const { id } = this.props.match.params;
      this.props.getRecipe(id);
    }
  }

  /**
   * @description checks if next recipes is fetched and disables is loading
   *
   * @method
   *
   * @memberOf SingleRecipe
   *
   * @param {Object} nextProps - nextProps object
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const { isFetched, isUpdated, recipes } = nextProps.userRecipeReducer;
    const { id } = this.props.match.params;
    if (isFetched) {
      const { id } = this.props.match.params;
     const index = recipes.findIndex(recipe => recipe.id === parseInt(id, 10));
      this.setState({ isLoading: false,
        title: recipes[index].title,
        description: recipes[index].description,
        ingredients: recipes[index].ingredients,
        procedures: recipes[index].procedures,
        imageUrl: recipes[index].imageUrl });
    } else if (isUpdated) {
      this.props.history.goBack();
    }
  }

  /**
   * @description get input and add to state
   *
   * @method
   *
   * @memberOf EditRecipe
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
   * @memberOf EditRecipe
   *
   * @param {Event} event - event object
   *
   * @returns {void}
   */
  handleImageChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({ errors: {}, image: {}, selectedImage: '' });
    this.setState({ image: file });
  
    const reader = new FileReader();
    reader.onload = () => {
        this.setState({ selectedImage: reader.result });
    }
    reader.readAsDataURL(file);
  }

  /**
   *
   * @description submits form
   *
   * @method
   *
   * @memberOf EditRecipe
   *
   * @param {Event} event - event object
   *
   * @returns {void}
   *
   */
  handleOnsubmit(event) {
    event.preventDefault();
    const err = validateEditRecipeForm(this.state);
    if (err.isError) {
      return this.setState({ errors: err.errors });
    }
    // console.log(Object.keys(this.state.image), 'with');
    // if(Object.keys(this.state.image)) {
    //   const uploadData = imageToFormData(this.state.image);
    //   delete axios.defaults.headers.common['Authorization'];
    //   axios(uploadData)
    //     .then((data) => {
    //     this.setState({ imageUrl: data.data.secure_url });
    //     console.log(this.state, 'with');
    //     this.props.editRecipe(this.state);
    //   }).catch((error) => { 
    //     this.setState({ disabled: false });
    //     Materialize.toast("Error! Please try again", 4000, 'red');
    //   });
    // } else {
    //   console.log(this.state, 'without');
    const { id } = this.props.match.params;
      this.props.editRecipe(id, this.state);
    // }
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
    const { isFetched, recipes} = this.props.userRecipeReducer;
    
    if (this.state.isLoading) {
      return (
        <div className="body grey lighten-5">
            <UserMenu {...this.props} />
            <div className="main">
              <div className="container">
                <Preloader />
              </div>
            </div>
          <Footer />
          </div>
        )
      }
      
    if(isFetched === false && !recipes) {
      return (
        <div className="body grey lighten-5">
          <UserMenu {...this.props} />
          <div className="main">
            <div className="container">
              <h4 className="center-align" style={{ marginTop: 200 }}>
                No recipe found</h4>
            </div>
          </div>
        <Footer />
        </div>
      )
    }

    return (
      <div className="body grey lighten-5">
        <UserMenu />
        <div className="main">
          <div className="container">
            <div className="edit-recipe-form">
              <div className="col l6 m8 s12 offset-l6 offset-m4">
                <h4 className="center">Edit Recipe</h4>
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
                  <div className="file-field input-field"
                    style={{ marginLeft: 10, marginRight: 10 }}>
                    <div className="btn green">
                      <span> 
                        <i 
                          className="material-icons"
                        >insert_photo
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
                  <div 
                    className="row s12 m4 l4 center-align" 
                    style={{ width: '100%'}}>
                    <img src={this.state.selectedImage||this.state.imageUrl} 
                      className="responsive-img center z-depth-2" 
                      style={{ maxHeight: 400, minHeight: 'auto', maxWidth: 400, minWidth: 'auto' }}/>
                  </div> 
                </div>
                <div className="row">
                  <button
                    className="btn right green"
                    type="submit"
                    name="action"
                    disabled={this.state.disabled}
                    style={{ marginRight: 10 }}
                  >Update
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

EditRecipe.propTypes = {
  editRecipe: PropTypes.func.isRequired,
  getRecipe: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  userRecipeReducer: PropTypes.shape({
    isFetched: PropTypes.bool.isRequired
  }).isRequired
};

EditRecipe.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userRecipeReducer: state.userRecipeReducer,
});

export default connect(mapStateToProps, { editRecipe, getRecipe })(EditRecipe);

