import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from './Home.jsx';
import Menu from './Header/Menu.jsx';
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
export class Main extends Component {
  /**
   * @description checks if a user is signed in
   *
   * @method
   *
   * @memberOf Main
   *
   * @returns {undefined}
   *
   */
  componentWillMount() {
    if (this.props.userData.isAuthenticated) {
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
   * @returns {undefined}
   *
   */
  componentDidMount() {
    $('.parallax').parallax();
    $('.button-collapse').sideNav();
  }
  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf Mian
   *
   * @returns {undefined}
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
const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps)(Main);
