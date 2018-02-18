import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import { connect } from 'react-redux';
import { fetchAllRecipes } from '../action/actionCreators';
import RecipeCard from './RecipeCard.jsx';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';
import Preloader from './Preloder.jsx';
// import '../../node_modules/rc-pagination/assets/index.css';

/**
 *
 * @description RecipesList used to display recipes
 *
 * @class
 *
 * @extends Component
 *
 */
export class RecipesList extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = ({ isLoading: true });
  }

  /**
   * @description fetch all recipe before component mounts
   *
   * @method
   *
   * @memberOf RecipesList
   *
   * @returns {undefined}
   *
   */
  componentWillMount() {
    const currentPage = this.props.location.search.substring(6);
    if (Number(currentPage) && Number(currentPage) > 0) {
      const offset = 6 * (currentPage - 1);
      this.props.fetchAllRecipes(offset);
    } else {
      this.props.fetchAllRecipes(0);
    }
  }

  /**
   * @description checks if next recipes is fetched and disables is loading
   *
   * @method
   *
   * @memberOf RecipesList
   *
   * @param {Object} nextProps - nextProps object
   *
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipeReducer.isFetched) {
      this.setState({ isLoading: false });
    }
  }

  /**
   * @description handels page change
   *
   * @method
   *
   * @memberOf RecipesList
   *
   * @param {Integer} page - current page
   *
   * @returns {undefined}
   */
  onChange(page) {
    this.props.history.push(`/recipes?page=${page}`);
    const offset = 6 * (page - 1);
    this.props.fetchAllRecipes(offset);
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf RecipeList
   *
   * @returns {undefined}
   *
   */
  render() {
    const { recipes, pagination } = this.props.recipeReducer;
    let allRecipes;
    if (recipes && recipes.length === 0) {
      allRecipes = <h4 className="center-align">This page has no recipe</h4>;
    } else if (recipes.length > 0) {
      allRecipes = recipes.map(recipe => (<RecipeCard
        {...this.props}
        key={recipe.id}
        id={recipe.id}
        recipe={recipe}
      />));
    }
    return (
      <div className="body grey lighten-5">
        <UserMenu {...this.props} />
        <div className="main">
          <div className="container">
            <div className="row">
              <h4 className="center">Recipes</h4>
              <hr />
            </div>
            <div className="row left align-recipe" style={{ width: '100%' }}>
              {this.state.isLoading ? <Preloader /> : allRecipes}
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

RecipesList.propTypes = {
  recipeReducer: PropTypes.shape({
    pagination: PropTypes.shape({
      currentPage: PropTypes.number,
      pageSize: PropTypes.number,
      totalCount: PropTypes.number
    }),
    recipes: PropTypes.shape.isRequired,
    isFetched: PropTypes.bool.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  fetchAllRecipes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  recipeReducer: state.recipeReducer,
  userData: state.userData,
  favouriteReducer: state.favouriteReducer
});

export default connect(mapStateToProps, { fetchAllRecipes })(RecipesList);
