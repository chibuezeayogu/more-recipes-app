import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile, getUser } from '../action/actionCreators';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';

/**
 * @description
 *
 * @class
 *
 * @extends Component
 *
 */
class UserProfile extends Component {
 /**
   * @description initialize state and binds functiom
   *
   * @constructor
   *
   * @memberOf UserProfile
   *
   * @returns {void}
   *
   */
  constructor() {
    super();
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      imageUrl:'',
      location: '',
      address: '',
      gender: '',
      editButton: '',
      errors: {},
      disabled: true,
    };
  
    this.handleChange = this.handleChange.bind(this);
    this.handleOnsubmit = this.handleOnsubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel= this.handleCancel.bind(this);
  }

  componentWillMount() {
    this.props.getUser(1);
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps.userData;
    this.setState({
      isLoading: false,
      disabled: true,
      id: currentUser.id,
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || '',
      phone: currentUser.phone || '',
      location: currentUser.location|| '',
      address: currentUser.address || '',
    });
  }
  
  /**
   * 
   */
  handleImageChange(event) {
    event.preventDefault();

  }

  handleChange(event) {
    this.setState({ errors: {} });
    this.setState({ [event.target.name]: event.target.value });
  }

  handleEdit(event) {
    event.preventDefault();
    this.setState({ disabled: false });
    console.log('disabled', this.state.disabled);
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ disabled: true });
    console.log('disabled', this.state.disabled);
  }

  /**
   * 
   */
  handleOnsubmit(event) {
    event.preventDefault();
    this.props.editProfile(1, this.state);
    console.log('action called');

  }


  render() {
    return (
      <div className="body">
        <UserMenu />
        <div className="main">
          <div className="container">
            <div className="row white" style={{ height: 100 }}>
              <h4 className="center">Profile </h4>
              <hr />
            </div>
            <form onSubmit={event => this.handleOnsubmit(event)}>
            <div
              className="row profile-details-page" 
              >
              <div className="col s12 m6 l5">
                <img 
                  src={'http://res.cloudinary.com/chibuezeayogu/image/upload/v1516785634/xqrzf0nkvzpnlvyesakm.jpg'} 
                  alt="" 
                  className="responsive-img circle center profile-image"
                />
              </div>
              <div className="col s12 m6 l7">
              <div className="profile-input-display">
                <div className="profile-label">FIRST NAME</div>
                <input 
                  type="text"
                  name="firstName"
                  className="profile-input" 
                  disabled={this.state.disabled}
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="profile-input-display">
                <div className="profile-label">LAST NAME</div>
                <input 
                  type="text"
                  name="lastName"
                  className="profile-input" 
                  disabled={this.state.disabled}
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="profile-input-display">
                <div className="profile-label">EMAIL</div>
                <div
                  className="profile-input"
                >{this.state.email}
                </div>
              </div>
              <div className="profile-input-display">
                <div className="profile-label">PHONE</div>
                <input
                  type="text"
                  name="phone"
                  className="profile-input"
                  disabled={this.state.disabled}
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </div>
              <div className="profile-input-display">
                <div className="profile-label">LOCATION</div>
                <input
                  type="text"
                  name="location"
                  className="profile-input"
                  disabled={this.state.disabled}
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </div>
              <div className="profile-input-display">
                <div className="profile-label">ADDRESS</div>
                <input
                  type="text"
                  name="address"
                  className="profile-input"
                  disabled={this.state.disabled}
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>
              <button 
                className="btn modal-trigger green" 
                onClick={this.handleEdit} 
                style={{ marginRight: 5 }}>Edit
              </button>
              <button 
                className="btn green" 
                style={{ marginRight: 5 }}>Update
              </button>
              <button 
                className="btn red lighten-1"
                onClick={this.handleCancel}>Cancel
              </button>
             
              </div>
              </div>
              </form>
              </div>
            </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps,
  { editProfile, getUser })(UserProfile);
