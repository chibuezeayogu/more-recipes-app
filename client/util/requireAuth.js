import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import verifyToken from './verifyToken';


export default (ComposedComponent) => {
  class Authenticate extends Component {

    componentWillMount() {
      if(!this.props.userData.isAuthenticated) {
        Materialize.toast('You need to login to access this page', 4000, 'red');
        this.props.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.userData.isAuthenticated) {
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
  }).isRequired
  };

  const mapStateToProps = state => ({
    userData: state.userData,
  });

  return connect(mapStateToProps)(Authenticate);
}


