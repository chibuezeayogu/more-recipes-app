import React from 'react';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';

/**
* The page the user gets when an invalid route is entered
* in the address bar.
*
* @description
*
* @method
*
* @returns {undifined} - JSX element
*/
const NotFound = () => (
  <div className="body">
    <UserMenu />
    <div className="main">
      <div className="container">
        <h1 className="center" style={{ marginTop: 200 }}>Page Not Found</h1>
      </div>
    </div>
    <Footer />
  </div>
);

export default NotFound;
