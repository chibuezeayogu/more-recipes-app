import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { SignOut } from '../../action/actionCreators';
import { Link } from 'react-router-dom';
import image from '../../img/logo.jpg';

/**
 * menu component athenticated users
 * @class
 *
 * @extends Component
 *
 */
class UserMenu extends Component {
  /**
   * @description initializes dropdown and button collapse
   *
   * @method
   *
   * @memberOf UserMenu
   *
   * @returns {void}
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
    $('.button-collapse').sideNav();
  }

  /**
   * @description routes to /if user is logs' out
   *
   * @method
   *
   * @memberOf UserMenu
   *
   * @param {Event} e
   *
   * @returns {void}
   *
   */
  logout(e) {
    e.preventDefault();
    this.props.SignOut();
    localStorage.removeItem('jwtToken');
    this.context.router.history.push('/signin');
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf SignIn
   *
   * @returns {void}
   *
   */
  render() {
    const token = localStorage.getItem('jwtToken');
    const userData = jwtDecode(token);
    return (
      <div>
        <div>
          <nav>
            <div className="nav-wrapper black">
              <a href="#!" className="brand-logo">
                <img
                  src={image}
                  className="responsive-img image-raduis"
                  alt=""
                  style={{ height: 25 }}
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
                  <Link to="/recipes">
                    <i className="fa fa-home" /> Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/addrecipe">
                    <i className="fa fa-plus" aria-hidden="true" /> Add Recipe
                  </Link>
                </li>
                <li>
                  <Link to="/search">
                    <i className="fa fa-search" aria-hidden="true" /> Search
                  </Link>
                </li>
                <li>
                  <a
                    href="#!"
                    className="dropdown-button"
                    data-activates="dropdown"
                    data-beloworigin="true"
                  > {userData.user.firstName}
                    <i className="material-icons right">arrow_drop_down</i>
                  </a>
                </li>
              </ul>
              <ul
                className="side-nav"
                id="mobile-demo"
              >
                <li>
                  <Link to="/recipes">
                    <i className="fa fa-home" /> Recipes
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link to="/addrecipe">
                    <i className="fa fa-plus" aria-hidden="true" /> Add Recipe
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link to="/search">
                    <i className="fa fa-search" aria-hidden="true" /> Search
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link to="/user/profile">
                    <i className="fa fa-user" aria-hidden="true" /> Profile
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link to="/user/recipes">
                    <i className="fa fa-cutlery" aria-hidden="true" /> My Recipes
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link to="/user/favourites">
                    <i className="fa fa-heart" aria-hidden="true" /> My Favourites
                  </Link>
                </li>
                <div className="divider" />
                <li>
                  <Link to="/" onClick={e => this.logout(e)}>
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
            <Link to="/user/profile" className="black-text">
              <i 
                className="fa fa-user black-text" 
                aria-hidden="true" /> My Profile
            </Link>
          </li>
          <div className="divider" />
          <li className="black-text">
            <Link to="/user/recipes" className="black-text">
              <i className="fa fa-cutlery black-text" 
                aria-hidden="true" /> My Recipes
            </Link>
          </li>
          <div className="divider" />
          <li className="black-text">
            <Link to="/user/favourites" className="black-text">
              <i className="fa fa-heart black-text" 
                aria-hidden="true" /> My Favourites
            </Link>
          </li>
          <div className="divider" />
          <li className="black-text">
            <Link to="/" onClick={e => this.logout(e)} className="black-text">
              <i className="fa fa-sign-out black-text"
                aria-hidden="true" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

UserMenu.contextTypes = {
  router: PropTypes.object.isRequired
};

UserMenu.propTypes = {
  SignOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  userData: state.userData,
});

export default connect(mapStateToProps, { SignOut })(UserMenu);
