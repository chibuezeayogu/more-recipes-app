import React from 'react';
import { withRouter, Link } from 'react-router-dom';

/**
 *
 * @description menu component for unathenticated users
 *
 * @constant
 *
 * @returns {Undefined}
 */
export const Menu = () => (
  <div>
    <nav>
      <div className="nav-wrapper black">
        <a className="brand-logo">
          <img src={'https://res.cloudinary.com/chibuezeayogu/image/upload'+
            '/v1516130489/yy3vdswodkvr3mj5lts1.jpg'}
            className="responsive-img image-radius" 
            alt="" style={{ height: 25, marginRight: 10, marginLeft: 10 }} />
            More Recipes</a>
        <a 
          data-activates="mobile-demo" 
          className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/">
              <i className="fa fa-home" /> Home
            </Link>
          </li>
          <li>
              <Link to="/signin">
                <i 
                  className="fa fa-sign-in" 
                  aria-hidden="true" />  Login
                </Link>
              </li>
          <li>
            <Link to="/signup">
              <i 
                className="fa fa-user-plus" 
                aria-hidden="true" 
              /> Sign Up
            </Link>
          </li>
        </ul>
        <ul 
          className="side-nav" 
          id="mobile-demo">
          <li>
            <Link to="/">
              <i className="fa fa-home" 
              /> Home
            </Link>
          </li>
          <div className="divider" />
          <li>
            <Link to="/signin">
              <i 
                className="fa fa-sign-in" 
                aria-hidden="true" 
              /> Login
            </Link>
          </li>
          <div className="divider" />
          <li>
            <Link to="/signup">
              <i 
                className="fa fa-user-plus" 
                aria-hidden="true" 
              /> Sign Up
            </Link>
          </li>
          <div className="divider" />
        </ul>
      </div>
    </nav>
  </div>
);
 
export default withRouter(Menu);
