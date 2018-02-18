import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export default (ComposedComponent) => {
  class Authenticate extends Component {
    componentWillMount() {
      if (!this.props.userData.isAuthenticated) {
        Materialize.toast('You need to login to access this page', 4000, 'red');
        this.props.history.push('/signin');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    userData: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  const mapStateToProps = state => ({
    userData: state.userData,
  });

  return connect(mapStateToProps)(Authenticate);
};
