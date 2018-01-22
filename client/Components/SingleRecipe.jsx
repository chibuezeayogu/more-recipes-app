import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../action/actionCreators';
import Comments from './Comments.jsx';
import Preloader from './Preloder.jsx';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';
import { validateComment } from '../middleware/validateInputs';


/**
 *
 * @class
 *
 * @extends Component
 */
class SingleRecipe extends Component {
  /**
   *
   * @description set instail state and binds actions
   *
   * @constructor
   *
   * @memberOf SingleRecipe
   *
   * @returns {void}
   */
  constructor() {
    super();
    this.state = {
      isLoading: true,
      comment: '',
      errors: {}
    };
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
    this.handleAddToFavourite = this.handleAddToFavourite.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderComment = this.renderComment.bind(this);
  }

  /**
   *
   * @description
   *
   * @method
   *
   * @memberOf SingleRecipe
   *
   * @returns {void}
   */
  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.props.history.push('/');
    } else {
      const { user } = jwtDecode(token);
      const { id } = this.props.match.params;
      this.props.getRecipe(id);
      this.props.getRecipeComment(id);
      this.props.getUserFavouriteRecipeIds(user.id)
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
    if (nextProps.recipeReducer.isFetched === true ||
       nextProps.recipeReducer.isFetched === false ) {
      this.setState({ isLoading: false });
    }
  }

  /**
   *
   * @description
   *
   * @method
   *
   * @memberOf SingleRecipe
   *
   * @returns {void}
   */
  handleUpvote() {
    const { id } = this.props.match.params;
    this.props.upVoteRecipe(id);
  }

  /**
   *
   * @description
   *
   * @method
   *
   * @memberOf SingleRecipe
   *
   * @returns {void}
   */
  handleAddToFavourite() {
    const { id } = this.props.match.params;
    this.props.addOrRemoveFavourite(id);
  }

  /**
   *
   * @description
   *
   * @method
   *
   * @memberOf SingleRecipe
   *
   * @returns {void}
   */
  handleDownvote() {
    const { id } = this.props.match.params;
    this.props.downVoteRecipe(id);
  }

  /**
   * @description Set the state of user input
   *
   * @method
   *
   * @memberOf SingleRecipe
   *
   * @param {Event} e - event
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
   *
   * @description
   *
   * @method
   *
   * @param {Event} e
   *
   * @memberOf SingleRecipe
   *
   * @returns {void}
   */
  handleOnsubmit(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    const token = localStorage.getItem('jwtToken');
    const { user } = jwtDecode(token);
    const comment = this.state.comment;
    const err = validateComment(this.state);
    console.log(err);
    if (err.isError) {
      return this.setState({ errors: err.errors });
    }
    this.props.postComment(id, user.id, comment);
  }


  renderComment() {
    const { commentReducer, ...rest } = this.props;
    const { reviews } = commentReducer;
      return (
        reviews.map((review, i) => <Comments 
        {...this.props} 
        key={i} 
        i={i} 
        review={review} 
      />)
      );
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf SingleRecipe
   *
   * @returns {void}
   */
  render() {
    const token = localStorage.getItem('jwtToken');
    const { user } = jwtDecode(token);
    const { id } = this.props.match.params;
    const { recipeReducer, favouriteReducer } = this.props;
    const { recipes, isFetched } =  recipeReducer;
    const { favouritedIds } = favouriteReducer;
    const index = recipes.findIndex(recipe => recipe.id === parseInt(id, 10));
    

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

    if(isFetched === false) {
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
        <UserMenu {...this.props} />
        <div className="main">
            <div className="container">
              <div className="row" style={{ height: 100 }}>
                <h4 className="center">Recipe Details</h4>
                <hr />
              </div>
              <div className="row space">
                <div className="row s12 m6">
                  <div className="col s12 m6">
                    <div className="card">
                      <img
                        src={recipes[index].imageUrl}
                        alt=""
                        className="responsive-img"
                      />
                      <div className="card-action center grey lighten-5">
                        <a
                          className="black-text"
                          onClick={this.handleUpvote}
                          style={{ cursor: 'pointer' }}
                        >
                          <i
                            className="fa fa-thumbs-o-up"
                            aria-hidden="true"
                          /> {recipes[index].upvotes}
                        </a>
                        <a
                          className="black-text"
                          onClick={this.handleDownvote}
                          style={{ cursor: 'pointer' }}
                        >
                          <i
                            className="fa fa-thumbs-o-down tiny"
                            aria-hidden="true"
                          > {recipes[index].downvotes}
                          </i>
                        </a>
                        <a
                          className="black-text"
                        >
                          <i
                            className="fa fa-eye"
                            aria-hidden="true"
                          />{recipes[index].views}
                        </a>
                        <a
                          className="black-text"
                          style={{ cursor: 'pointer' }}
                          onClick={this.handleAddToFavourite}
                        >
                          <i
                            className="fa fa-heart"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col s4 m4 ">
                    <h4 className="flow-text bold" style={{ heigth: 50 }}> 
                     <p>{recipes[index].title}</p>
                    </h4>
                    <hr />
                    <div className="flow-text" style={{ fontStyle: 'italic' }}>
                     <p>{recipes[index].description}</p>
                    </div>
                  </div>
                </div>
                <div className="row s12 m6">
                  <div className="col s12 m6">
                    <h4>Ingredients</h4>
                    <ul className="collection">
                      {recipes[index].ingredients.split(';')
                        .map((ingredient, i) =>
                        (
                          <li
                            className="collection-item"
                            key={i}
                          >
                            {ingredient}
                          </li>))
                        }
                    </ul>
                  </div>
                  <div className="col s12 m6">
                    <h4>Procedures</h4>
                    <ul className="collection">
                      {recipes[index].procedures.split(';')
                        .map((procedure, i) =>
                        (
                          <li
                            className="collection-item"
                            key={i}
                          >
                            {procedure}
                          </li>))
                        }
                    </ul>
                  </div>
                </div>
                <div className="row s12 m6">
                  <h4>Comments</h4>
                  <ul className="collection">
                    {this.renderComment()}
                  </ul>
                </div>
                <div className="row s12 m6">
                  <form onSubmit={e => this.handleOnsubmit(e)}>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          id="comment"
                          name="comment"
                          value={this.state.comment}
                          onChange={this.handleChange}
                          placeholder="Enter Comment"
                        />
                      </div>
                      <span className="right red-text">
                        {this.state.errors.commentError}
                      </span>
                    </div>

                    <div className="row s12 m6">
                      <button
                        className="btn waves-effect waves-light green right"
                        type="submit"
                        name="action"
                      >Submit
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
        <Footer />
      </div>
    )
  }
}

SingleRecipe.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  getRecipeComment: PropTypes.func.isRequired,
  recipeReducer: PropTypes.shape({
    recipes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      upvotes: PropTypes.number.isRequired,
      downvotes: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired
    })).isRequired,
  }).isRequired,
  commentReducer: PropTypes.shape({
    reviews: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      view: PropTypes.bool.isRequired,
      comment: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      recipeId: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      User: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  recipeReducer: state.recipeReducer,
  commentReducer: state.commentReducer,
  favouriteReducer: state.favouriteReducer,
  userData: state.userData,
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
