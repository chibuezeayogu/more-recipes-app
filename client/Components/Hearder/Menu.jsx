import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../img/logo.jpg';


/**
 * menu component unathenticated users
 * @constant
 */
const Menu = () => (
  <div>
    <nav>
      <div className="nav-wrapper black">
        <a href="#!" className="brand-logo"><img src={image} className="responsive-img" alt="" style={{ height: 25 }} />More Recipes</a>
        <a href="#!" data-activates="mobile-demo" className="button-collapse">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/"><i className="fa fa-home" /> Home</Link></li>
          <li><Link to="/signin"><i className="fa fa-sign-in" aria-hidden="true" />  Login</Link></li>
          <li><Link to="/signup"><i className="fa fa-user-plus" aria-hidden="true" /> Sign Up</Link></li>
        </ul>
        <ul className="side-nav" id="mobile-demo">
          <li><Link to="/"><i className="fa fa-home" /> Home</Link></li>
          <div className="divider" />
          <li><Link to="/signin"><i className="fa fa-sign-in" aria-hidden="true" /> Login</Link></li>
          <div className="divider" />
          <li><Link to="/signup"><i className="fa fa-user-plus" aria-hidden="true" /> Sign Up</Link></li>
          <div className="divider" />
        </ul>
      </div>
    </nav>
  </div>
);
 
export default Menu;
