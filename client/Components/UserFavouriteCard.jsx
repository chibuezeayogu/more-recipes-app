import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 *
 * @description displays each recipe
 *
 * @method
 *
 * @param {Object} props - property object
 *
 *  @returns {void}
 */
class UserFavouriteCard extends Component {

  handelFavourites(id) {
   this.props.addOrRemoveFavourite(id);
  }


  render() {
    const token = localStorage.getItem('jwtToken');
    const { user } = jwtDecode(token);
    const { favourite } = this.props;
    console.log(favourite, this.props, '99999999999');
    return (
      <div className="col s12 m4 l3">
        <div className="card hoverable">
          <Link to={`/recipes/${favourite.id}`}>
            <img
              src={favourite.imageUrl}
              alt=""
              className="responsive-img img-height"
            />
          </Link>
          <div 
            className="card-content black-text grey lighten-5">
            <span className="card-title text-title">
              {favourite.title}
            </span>
            <p className="text-description">
              {favourite.description.substring(0, 25)}...
            </p>
          </div>
          <div 
            className="card-action black-text center grey lighten-4">
            <a className="black-text">
              <i 
                className="fa fa-thumbs-o-up" 
                  aria-hidden="true"> {favourite.upvotes}
              </i>     
            </a>
            <a 
              className="black-text">
              <i 
                className="fa fa-thumbs-o-down" 
                  aria-hidden="true"> {favourite.downvotes}
              </i>  
            </a>
            <a className="black-text">
              <i 
                className="fa fa-eye" 
                  aria-hidden="true"> {favourite.views}
              </i>
            </a>
            <a 
              className="black-text" 
                onClick={() => this.handelFavourites(favourite.id)}
                style={{ cursor: 'pointer' }}
              >
              <i 
                className="fa fa-heart red-heart" 
                  aria-hidden="true" /> 
            </a>
          </div>
        </div>
      </div>
    );
  };
}

UserFavouriteCard.propTypes = {
  favourite: PropTypes.shape({
    id: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }).isRequired
};

export default UserFavouriteCard;
