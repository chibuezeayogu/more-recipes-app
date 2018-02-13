import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Preloader from './Preloder.jsx';
import { bindActionCreators } from 'redux';
import Pagination from 'rc-pagination';
import { connect } from 'react-redux';
import UserRecipeCard from './UserRecipeCard.jsx';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';
import * as actionCreators from '../action/actionCreators';
import { onPageChange, onPageReload } from '../util/pageFunctions';
// import '../../node_modules/rc-pagination/assets/index.css';

/**
 *
 * @description UserRecipesList used to display recipes
 *
 * @class
 *
 * @extends Component
 *
 */
export class UserRecipesList extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = ({ isLoading: true });
  }

  /**
   * @description fetch user favourite recipe before component mounts
   *
   * @method
   *
   * @memberOf UserRecipesList
   *
   * @returns {Undefined} - no return value
   *
   */
  componentWillMount() {
    const { currentUser } = this.props.userData;
    const currentPage = this.props.location.search.substring(6);
    const { isTrue, offset } = onPageReload(currentPage);
    if (isTrue) {
      this.props.fetchUserRecipes(currentUser.id, offset);
    }
  }

  /**
   * @description checks if next recipes is fetched and disables isLoading
   *
   * @method
   *
   * @memberOf UserRecipesList
   *
   * @param {Object} nextProps - nextProps object
   *
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps.userData;
    const {
      isFetched,
      recipes,
      isDeleted,
      pagination
    } = nextProps.userRecipeReducer;
    if (isFetched) {
      this.setState({ isLoading: false });
    } else {
      const { isTrue, offset } = onPageChange(recipes, isDeleted, pagination);
      if (isTrue) {
        this.setState({ isLoading: true });
        this.props.fetchUserRecipes(currentUser.id, offset);
      }
    }
  }

  /**
   * @description handels page change
   *
   * @method
   *
   * @memberOf UserFavouritesList
   *
   * @param {page} page - current page
   *
   * @returns {undefined}
   */
  onChange(page) {
    this.props.history.push(`/user/recipes?page=${page}`);
    const offset = 6 * (page - 1);
    this.props.fetchUserRecipes(this.props.userData.currentUser.id, offset);
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf UserRecipesList
   *
   * @returns {undefined}
   *
   */
  render() {
    const { recipes, pagination } = this.props.userRecipeReducer;
    let userRecipes;
    if (recipes && recipes.length === 0 && !this.state.isLoading) {
      userRecipes = <h4 className="center-align">
      You have not added any recipe
      </h4>;
    } else if (recipes.length > 0) {
      userRecipes = recipes.map(recipe => (<UserRecipeCard
        {...this.props}
        key={recipe.id}
        recipe={recipe}
      />));
    }
    return (
      <div className="body grey lighten-5">
        <UserMenu {...this.props} />
        <div className="main">
          <div className="container">
            <div className="row">
              <h4 className="center">My Recipes</h4>
              <hr />
            </div>
            <div className="row left align-recipe" style={{ width: '100%' }}>
              {this.state.isLoading ? <Preloader /> : userRecipes}
            </div>
          </div>
        </div>
        <div className="row s12 m6 l3">
          { recipes.length > 0 ?
            <Pagination
              onChange={this.onChange}
              current={pagination.currentPage}
              pageSize={pagination.pageSize}
              total={pagination.totalCount}
            />
            : ''
          }
        </div>
        <Footer />
      </div>
    );
  }
}

UserRecipesList.propTypes = {
  fetchUserRecipes: PropTypes.func.isRequired,
  userRecipeReducer: PropTypes.shape({
    recipes: PropTypes.shape.isRequired,
    isFetched: PropTypes.bool.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

const mapStateToProps = state => ({
  userRecipeReducer: state.userRecipeReducer,
  userData: state.userData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserRecipesList);
