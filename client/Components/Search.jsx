import React, { Component } from 'react';
import { connect } from 'react-redux';
import { search, fetchRecipesWithMostUpvote } from '../action/actionCreators';
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
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentWillMount() {
    this.props.fetchRecipesWithMostUpvote();
  }
  /**
   * @description checks if the there is a new props
   *
   * @method
   *
   * @memberOf Search
   *
   * @param {Object} nextProps - nextProps object
   *
   * @returns {Undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchReducer.isFetched) {
      this.setState({ isLoading: false });
    }
  }



  handleSearch(event) {
    event.preventDefault();
    const serchTerm = event.target.value;
    if ((event.target.value).length > 2) {
      this.props.search(serchTerm);
      this.state = ({ isLoading: true });
    } else {
      this.props.history.push(`/search`);
      this.props.fetchRecipesWithMostUpvote();
    }
  }

  /**
   * @description handels page change
   *
   * @method
   *
   * @memberOf Search
   *
   * @param {Integer} page - current page
   *
   * @returns {Undefined}
   */
  onChange(page) {

  }

 /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf Search
   *
   * @returns {Undefined}
   *
   */
  render() {
    const { recipes, display, pagination } = this.props.searchReducer;
    return (
      <div className="body">
        <UserMenu {...this.props} />
        <div className="main">
          <div className="container">
            <div className="row">
              <h4 className="center">Search Recipe</h4>
              <hr />
            </div>
            <div className="row">
              <form className="col s12"
                onChange={this.handleSearch}>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="search" type="text" />
                    <label htmlFor="search">Enter Search term</label>
                  </div>
                </div>
              </form>
            </div>
            <h4 className="center">{display}</h4>
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
  searchReducer: state.searchReducer
});

export default connect(mapStateToProps,
  { search, fetchRecipesWithMostUpvote })(Search);
