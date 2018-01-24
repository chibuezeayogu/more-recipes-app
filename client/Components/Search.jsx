import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search } from '../action/actionCreators';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';
import SearchResult from './SearchResult.jsx';
import Pagination from 'rc-pagination';
import Preloader from './Preloder.jsx';
import 'rc-pagination/assets/index.css';

class Search extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = ({ isLoading: false });
  }

  handleSearch(e) {
    e.preventDefault();
    const serchTerm = e.target.value;
    if ((e.target.value).length >= 3) {
      this.props.search(serchTerm);
      this.state = ({ isLoading: true });
    } 
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResultReducer.isFetched) {
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
   * @param {page} page - current page
   *
   * @returns {void}
   */
  onChange(page) {
    this.props.history.push(`/recipes?page=${page}`);
    const offset = 8 * (page - 1);
    this.props.getAllRecipes(offset);
  }

 /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf RecipeList
   *
   * @returns {void}
   *
   */
  render() {
    const { recipes, pagination } = this.props.searchResultReducer;
    return (
      <div className="body">
        <UserMenu />
        <div className="main">
          <div className="container">
            <div className="row">
              <h4 className="center">Search Recipe</h4>
              <hr />
            </div>
            <div className="row">
              <form className="col s12"
                onChange={e => this.handleSearch(e)}>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="search" type="text" />
                    <label htmlFor="search">Enter Search term</label>
                  </div>
                </div>
              </form>
            </div>
            {this.state.isLoading ?
              <Preloader />
            :
              <SearchResult {...this.props} />
            }
          </div>
        </div>
        <div className="row s12 m6 l3">
          { recipes && recipes.length > 0 ?
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

const mapStateToProps = state => ({
  userData: state.userData,
  searchResultReducer: state.searchResultReducer
});

export default connect(mapStateToProps, { search })(Search);

