import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Home from './Home.jsx';
import Menu from './Hearder/Menu.jsx';
import Footer from './Footer/Footer.jsx';

/**
 *
 * @description Main component for user to signin
 *
 * @class
 *
 * @extends Component
 *
 */
class Main extends Component {

  /**
   * @description checks if a user is signed in
   *
   * @method
   *
   * @memberOf Main
   *
   * @returns {void}
   *
   */
  componentWillMount() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.props.history.push('/recipes');
    }
  }

  /**
   * @description initailize parallax
   *
   * @method
   *
   * @memberOf Main
   *
   * @returns {void}
   *
   */
  componentDidMount() {
    $('.parallax').parallax();
  }
/**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf Mian
   *
   * @returns {void}
 */
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
