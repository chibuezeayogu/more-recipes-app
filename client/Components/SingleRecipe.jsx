import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../action/actionCreators';
import Comments from './Comments.jsx';
import Preloader from './Preloder.jsx';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';
import { validateCommentForm } from '../util/validateInputs';
import findIndex from '../util/findIndex';


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
   * @returns {Undefined}
   */
  constructor() {
    super();
    this.state = {
      isLoading: true,
      comment: '',
      errors: {}
    };

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
   * @returns {Undefined}
   */
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.fetchRecipe(id);
    this.props.fetchRecipeComment(id);
  }

  componentDidMount() {
    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
    });
       
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
   * @returns {Undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { isFetched } = nextProps.recipeReducer;
    if (isFetched === true || isFetched === false ) {
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
   * @returns {Undefined}
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
   * @returns {Undefined}
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
   * @returns {Undefined}
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
   * @param {Object} event - event 
   *
   * @returns {Undefined}
   *
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @description submits user comment
   *
   * @method
   *
   * @param {Object} event - event object
   *
   * @memberOf SingleRecipe
   *
   * @returns {Undefined}
   */
  handleOnsubmit(event) {
    event.preventDefault();
    const { id } = this.props.match.params;
    const { currentUser } = this.props.userData;
    const comment = this.state.comment;
    const err = validateCommentForm(this.state);
    if (err.isError) {
      return this.setState({ errors: err.errors });
    }
    this.props.postComment(id, currentUser.id, comment);
    this.setState({ comment: '' });
  }

  /**
   *
   * @description renders recipe comment
   *
   * @method
   *
   * @param {Object} event - event object
   *
   * @memberOf SingleRecipe
   *
   * @returns {Undefined}
   */

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
   * @returns {Undefined}
   */
  render() {
    const { id } = this.props.match.params;
    const { recipeReducer, favouriteReducer } = this.props;
    const { recipes, isFetched } =  recipeReducer;
    const index = findIndex(recipes, id);
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
                <div className="row s12 m6 l6">
                  <div className="col s12 m6 l6">
                    <div className="card">
                      <img
                        src={recipes[index].imageUrl}
                        alt=""
                        className="responsive-img"
                        style={{ width: '100%' }}
                      />
                      <div className="card-action center grey lighten-5">
                        <a
                          className="black-text tooltipped"
                          data-position="bottom" 
                          data-delay="50" 
                          data-tooltip="up vote"
                          onClick={() => this.handleUpvote(id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <i
                            className="fa fa-thumbs-o-up"
                            aria-hidden="true"
                          /> {recipes[index].upvotes}
                        </a>
                        <a
                          className="black-text tooltipped"
                          data-position="bottom" 
                          data-delay="50" 
                          data-tooltip="down vote"
                          onClick={() => this.handleDownvote(id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <i
                            className="fa fa-thumbs-o-down tiny"
                            aria-hidden="true"
                          > {recipes[index].downvotes}
                          </i>
                        </a>
                        <a
                          className="black-text tooltipped"
                          data-position="bottom" 
                          data-delay="50" 
                          data-tooltip="views"
                        >
                          <i
                            className="fa fa-eye"
                            aria-hidden="true"
                          /> {recipes[index].views}
                        </a>
                        <a
                          className="black-text tooltipped"
                          data-position="bottom" 
                          data-delay="50" 
                          data-tooltip="views"
                          style={{ cursor: 'pointer' }}
                          onClick={() => this.handleAddToFavourite(id)}
                        > 
                        <i
                          className="fa fa-heart"
                          aria-hidden="true"
                        />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col s12 m6 l6">
                    <h4 
                      className="flow-text bold" 
                      style={{ heigth: 40, wordWrap: 'break-word' }}> 
                     <p>{recipes[index].title}</p>
                    </h4>
                    <hr />
                    <div 
                      className="flow-text" 
                      style={{ fontStyle: 'italic', fontSize: 20, wordWrap: 'break-word' }}>
                     <blockquote>{recipes[index].description}</blockquote>
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
                            style={{ wordWrap: 'break-word' }}
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
                            style={{ wordWrap: 'break-word' }}
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
                  <form 
                    onSubmit={e => this.handleOnsubmit(e)} 
                  >
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
                      <span
                        className="right red-text" 
                        style={{ marginRight: 10 }}>
                        {this.state.errors.commentError}
                      </span>
                    </div>

                    <div className="row s12 m6">
                      <button
                        className="btn waves-effect waves-light green right"
                        type="submit"
                        name="action"
                        style={{ marginRight: 10 }}
                      >Submit
                        <i className="material-icons right">send</i>
                      </button>
                    </div>
                  </form>
                  <ul className="collection">
                    {this.renderComment()}
                  </ul>
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
  fetchRecipe: PropTypes.func.isRequired,
  fetchRecipeComment: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
