import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile, fetchUser } from '../action/actionCreators';
import UserMenu from './Header/UserMenu.jsx';
import Footer from './Footer/Footer.jsx';
import SmallPreloader from './SmallPreloader.jsx';
import { validateUpdateProfileForm } from '../util/validateInputs';
import imageToFormData from '../util/ImageUpload';


/**
 * @description
 *
 * @class
 *
 * @extends Component
 *
 */
export class UserProfile extends Component {
  /**
   * @description initialize state and binds functiom
   *
   * @constructor
   *
   * @memberOf UserProfile
   *
   * @returns {undefined}
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
      image: {},
      location: '',
      address: '',
      errors: {},
      disabled: true,
      onUpdate: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleOnsubmit = this.handleOnsubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  /**
   * @description dispatch an action to fetch user details
   *
   * @method
   *
   * @memberOf UserProfile
   *
   * @param {Object} nextProps
   *
   * @returns {undefiend}
   *
   */

  componentWillMount() {
    const { id } = this.props.userData.currentUser;
    this.props.fetchUser(id);
  }

  /**
   * @description sets State for input fileds
   *
   * @method
   *
   * @memberOf UserProfile
   *
   * @param {Object} nextProps
   *
   * @returns {undefined}
   *
   */
  componentWillReceiveProps(nextProps) {
    const { currentUser } = nextProps.userData;
    this.setState({
      disabled: true,
      id: currentUser.id,
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      phone: currentUser.phone || '',
      location: currentUser.location|| '',
      address: currentUser.address || '',
      isLoading: false,
    });
  }

  /**
   * @description gets selected image
   *
   * @method
   *
   * @memberOf UserProfile
   *
   * @param {Object} event
   *
   * @returns {undefined}
   *
   */
  handleImageChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    this.setState({ errors: {} });

    this.setState({ errors: {}, image: file });
  }

  /**
   * @description gets user input
   *
   * @method
   *
   * @memberOf UserProfile
   *
   * @param {Object} event
   *
   * @returns {undefined}
   *
   */
  handleChange(event) {
    this.setState({ errors: {} });
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @description sets input field to editable
   *
   * @method
   *
   * @memberOf UserProfile
   *
   * @param {Object} event
   *
   * @returns {undefined}
   *
   */
  handleEdit(event) {
    event.preventDefault();
    this.setState({ disabled: false });
  }

  /**
   * @description sets input field to readonly
   *
   * @method
   *
   * @memberOf UserProfile
   *
   * @param {Object} event
   *
   * @returns {undefined}
   *
   */
  handleCancel(event) {
    event.preventDefault();
    this.setState({ disabled: true });
  }

  /**
   * @description submits edit profile form
   *
   * @method
   *
   * @memberOf UserProfile
   *
   * @param {Object} event
   *
   * @returns {undefined}
   *
   */
  handleOnsubmit(event) {
    event.preventDefault();
    const err = validateUpdateProfileForm(this.state);
    if (err.isError) {
      return this.setState({ errors: err.errors });
    }
    this.setState({ disabled: true, onUpdate: true });
    if (this.state.image.name) {
      const uploadData = imageToFormData(this.state.image);
      delete axios.defaults.headers.common.Authorization;
      axios(uploadData)
        .then((data) => {
          this.setState({ imageUrl: data.data.secure_url });
          this.props.editProfile(this.state);
          this.setState({ onUpdate: false });
        }).catch(() => {
          this.setState({ disabled: false, onUpdate: false });
          Materialize.toast('Error! Please try again', 4000, 'red');
        });
    } else {
      this.props.editProfile(this.state);
      this.setState({ onUpdate: false });
    }
  }

  /**
   *
   * @description renders JSX element
   *
   * @method
   *
   * @memberOf UserProfile
   *
   * @returns {undefined}
   */
  render() {
    const { imageUrl } = this.props.userData.currentUser;
    return (
      <div className="body">
        <UserMenu {...this.props} />
        <div className="main">
          <div className="container">
            <div className="row white" style={{ height: 100 }}>
              <h4 className="center">Profile </h4>
              <hr />
            </div>
            <form onSubmit={this.handleOnsubmit}>
              <div
                className="row profile-details-page"
              >
                <div className="col s12 m6 l5">
                  <img
                    src={imageUrl}
                    alt=""
                    className="responsive-img circle center profile-image"
                  />
                </div>
                <div className="col s12 m6 l7">
                  <div className="profile-input-display">
                    <div className="profile-label">FIRST NAME</div>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      className="profile-input"
                      disabled={this.state.disabled}
                      value={this.state.firstName}
                      onChange={this.handleChange}
                    />
                    <span className="right red-text error-margin">
                      {this.state.errors.firstNameError}
                    </span>
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
                    <span className="right red-text error-margin">
                      {this.state.errors.lastNameError}
                    </span>
                  </div>
                  <div
                    className="profile-input-display"
                  >
                    <div
                      className="profile-label"
                    >PHONE
                    </div>
                    <input
                      type="text"
                      name="phone"
                      className="profile-input"
                      disabled={this.state.disabled}
                      value={this.state.phone}
                      onChange={this.handleChange}
                    />
                    <span className="right red-text error-margin">
                      {this.state.errors.phoneError}
                    </span>
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
                    <span className="right red-text error-margin">
                      {this.state.errors.locationError}
                    </span>
                  </div>
                  <div
                    className="profile-input-display"
                  >
                    <div className="profile-label">ADDRESS</div>
                    <input
                      type="text"
                      name="address"
                      className="profile-input"
                      disabled={this.state.disabled}
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                    <span className="right red-text error-margin">
                      {this.state.errors.addressError}
                    </span>
                  </div>
                  <div
                    className="file-field input-field"
                    style={
                      this.state.disabled
                      ? { display: 'none' }
                      : { display: 'block' }
                    }
                  >
                    <div className="btn green">
                      <span>
                        <i
                          className="material-icons"
                        >insert_photo
                        </i>
                      </span>
                      <input
                        id="image"
                        type="file"
                        multiple
                        onChange={this.handleImageChange}
                      />
                    </div>
                    <div
                      className="file-path-wrapper"
                    >
                      <input
                        className="file-path validate"
                        type="text"
                        placeholder="Upload profile image"
                      />
                    </div>
                    <span className="right red-text error-margin">
                      {this.state.errors.imageError}
                    </span>
                  </div>
                  <div>
                    <button
                      id="edit"
                      className="btn modal-trigger green"
                      onClick={this.handleEdit}
                      style={{ marginRight: 5 }}
                    >Edit
                    </button>
                    <button
                      id="update"
                      className="btn green"
                      disabled={this.state.disabled}
                      style={{ marginRight: 5 }}
                    >Update
                    </button>
                    <button
                      id="cancel"
                      className="btn red lighten-1"
                      onClick={this.handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  <hr />
                  <div className="row center">
                    <div>
                      {this.state.onUpdate ?
                        <SmallPreloader />
                      :
                      ''
                      }
                    </div>
                  </div>
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
  { editProfile, fetchUser })(UserProfile);
