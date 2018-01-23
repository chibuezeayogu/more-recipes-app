import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import Pagination from 'rc-pagination';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../action/actionCreators';
import UserFavouriteCard from './UserFavouriteCard.jsx';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';
import Preloader from './Preloder.jsx';
import 'rc-pagination/assets/index.css';

/**
 *
 * @description RecipesList used to display recipes
 *
 * @class
 *
 * @extends Component
 *
 */
class UserFavouritesList extends Component {
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
   * @memberOf UserFavouritesList
   *
   * @returns {void}
   *
   */
  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    const { user } = jwtDecode(token);
    if (!token) {
      this.props.history.push('/');
    } else {
      const currentPage = this.props.location.search.substring(6);
      if (Number(currentPage) && Number(currentPage) > 0) {
        const offset = 8 * (currentPage - 1);
        this.props.getUserFavourites(offset);
      } else {
        this.props.getUserFavourites(user.id, 0);
      }
    }
  }

   /**
   * @description checks if next recipes is fetched and disables is loading
   *
   * @method
   *
   * @memberOf UserFavouritesList
   *
   * @param {Object} nextProps - nextProps object
   *
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.favouriteReducer.isFetched) {
      this.setState({ isLoading: false });
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
   * @returns {void}
   */
  onChange(page) {
    const token = localStorage.getItem('jwtToken');
    const { user } = jwtDecode(token);
    this.props.history.push(`/recipes?page=${page}`);
    const offset = 8 * (page - 1);
    this.props.getUserFavourites(user.id, offset);
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf UserFavouritesList
   *
   * @returns {void}
   *
   */
  render() {
    const { favourites, pagination } = this.props.favouriteReducer;
    let favouriteRecipes;
    if (favourites && favourites.length === 0) {
      favouriteRecipes = <h4 className="center-align">This page has no recipe</h4>;
    } else if (favourites.length > 0) {
      favouriteRecipes = favourites.map(favourite => (<UserFavouriteCard
        {...this.props}
        key={favourite.id}
        favourite={favourite}
      />));
    }
    return (
      <div className="body grey lighten-5">
        <UserMenu />
        <div className="main">
          <div className="container">
            <div className="row">
              <h4 className="center">Favourite Recipes</h4>
              <hr />
            </div>
            <div className="row left align-recipe" style={{ width: '100%' }}>
              {this.state.isLoading ? <Preloader /> : favouriteRecipes}
            </div>
          </div>
        </div>
        <div className="row s12 m6 l3">
        { favourites.length > 0 ?
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

UserFavouritesList.propTypes = {
  recipeReducer: PropTypes.shape({
    pagination: PropTypes.shape({
      currentPage: PropTypes.number,
      pageSize: PropTypes.number,
      totalCount: PropTypes.number
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired,
  getUserFavourites: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  recipeReducer: state.recipeReducer,
  userData: state.userData,
  favouriteReducer: state.favouriteReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserFavouritesList);
