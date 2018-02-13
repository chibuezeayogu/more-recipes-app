import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../action/actionCreators';

/**
 * menu component athenticated users
 * @class
 *
 * @extends Component
 *
 */
export class UserMenu extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  /**
   * @description initializes dropdown and button collapse
   *
   * @method
   *
   * @memberOf UserMenu
   *
   * @returns {undefined}
   *
   */
  componentDidMount() {
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      hover: true,
      belowOrigin: true,
      alignment: 'right',
    });
    $('.button-collapse').sideNav({
      closeOnClick: true,
      draggable: false,
    });
  }

  /**
   * @description routes to /if user is logs' out
   *
   * @method
   *
   * @memberOf UserMenu
   *
   * @param {Object} event - even object
   *
   * @returns {undefiend} - no return value
   *
   */
  logout() {
    this.props.signOut();
    localStorage.removeItem('jwtToken');
    this.props.history.push('/signin');
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @returns {undefined}
   *
   */
  render() {
    return (
      <div>
        <div>
          <nav>
            <div className="nav-wrapper black">
              <a href="#!" className="brand-logo">
                <img
                  src={'https://res.cloudinary.com/chibuezeayogu/image/upload' +
                    '/v1516130489/yy3vdswodkvr3mj5lts1.jpg'}
                  className="responsive-img image-radius"
                  alt=""
                  style={{ height: 25, marginRight: 10, marginLeft: 10 }}
                />More Recipes
              </a>
              <a
                href="#!"
                data-activates="mobile-demo"
                className="button-collapse"
              >
                <i className="material-icons">menu</i>
              </a>
              <ul className="right hide-on-med-and-down">
                <li >
                  <Link
                    to="/recipes"
                  >
                    <i className="fa fa-home" /> Recipes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/addrecipe"
                  >
                    <i className="fa fa-plus" aria-hidden="true" /> Add Recipe
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                  >
                    <i className="fa fa-search" aria-hidden="true" /> Search
                  </Link>
                </li>
                <li>
                  <a
                    href="#!"
                    className="dropdown-button"
                    data-activates="dropdown"
                    data-beloworigin="true"
                  > {this.props.userData.currentUser.email}
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
              </ul>
              <ul
                className="side-nav"
                id="mobile-demo"
              >
                <li>
                  <Link
                    to="/recipes"
                  >
                    <i className="fa fa-home" /> Recipes
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link
                    to="/addrecipe"
                  >
                    <i className="fa fa-plus" aria-hidden="true" /> Add Recipe
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link
                    to="/search"
                  >
                    <i className="fa fa-search" aria-hidden="true" /> Search
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link
                    to="/user/profile"
                  >
                    <i className="fa fa-user" aria-hidden="true" /> Profile
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link
                    to="/user/recipes"
                  >
                    <i
                      className="fa fa-cutlery"
                      aria-hidden="true"
                    /> My Recipes
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link
                    to="/user/favourites"
                  >
                    <i
                      className="fa fa-heart"
                      aria-hidden="true"
                    /> My Favourites
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link
                    to="/"
                    onClick={this.logout}
                  >
                    <i className="fa fa-sign-out" aria-hidden="true" /> Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <ul id="dropdown" className="dropdown-content black-text">
          <div className="divider" />
          <li className="black-text">
            <Link
              to="/user/profile"
              className="black-text"
            >
              <i
                className="fa fa-user black-text"
                aria-hidden="true"
              /> My Profile
            </Link>
          </li>
          <div className="divider" />
          <li className="black-text">
            <Link
              to="/user/recipes"
              className="black-text"
            >
              <i
                className="fa fa-cutlery black-text"
                aria-hidden="true"
              /> My Recipes
            </Link>
          </li>
          <div className="divider" />
          <li className="black-text">
            <Link
              to="/user/favourites"
              className="black-text"
            >
              <i
                className="fa fa-heart black-text"
                aria-hidden="true"
              /> My Favourites
            </Link>
          </li>
          <div className="divider" />
          <li className="black-text">
            <Link
              to="/"
              onClick={this.logout}
              className="black-text"
            >
              <i
                className="fa fa-sign-out black-text"
                aria-hidden="true"
              /> Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}


UserMenu.propTypes = {
  signOut: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  userData: PropTypes.shape({
    currentUser: PropTypes.shape({
      email: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  userData: state.userData,
});

export default withRouter(connect(mapStateToProps, { signOut })(UserMenu));
