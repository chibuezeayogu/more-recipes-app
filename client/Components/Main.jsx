import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Home from './Home.jsx';
import Menu from './Hearder/Menu.jsx';
import Footer from './Footer/Footer.jsx';

import './../js/recipes.js';
import '../Style/test.scss';

/**
 * SignIn component for user to signin
 * @class
 * @extends Component
 */
class Main extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    const Token = localStorage.getItem('jwtToken');
    if (Token) {
      this.props.history.push('/recipes');
    }
  }

  /**
 * @description initailize parallax
 * @method
 * @memberOf Main
 * @returns {void}
 */
  componentDidMount() {
    $('.parallax').parallax();
  }

  render() {
    return (
      <div className="body">
        <Menu />
        <Home />
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default Main;
