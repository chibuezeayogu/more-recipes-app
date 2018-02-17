import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import swal from 'sweetalert';

/**
 *
 * @description displays each recipe
 *
 * @method
 *
 * @param {Object} props - property object
 *
 *  @returns {undefined}
 */
class UserFavouriteCard extends Component {
  handelFavourites(id, title) {
    swal({
      title: 'Are you sure?',
      text: `You want to remove "${title}" from your favourite!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.addOrRemoveFavourite(id);
        }
      });
  }

  /**
 *
 * @description renders JSX element
 *
 * @method
 *
 * @memberOf SingleRecipe
 *
 * @returns {undefined}
 */
  render() {
    const { favourite } = this.props;
    return (
      <div className="col s12 m6 l4">
        <div className="card hoverable">
          <Link to={`/recipes/${favourite.id}`}>
            <img
              src={favourite.imageUrl}
              alt=""
              className="responsive-img img-height"
              style={{ width: '100%' }}
            />
          </Link>
          <div
            className="card-content black-text grey lighten-5"
          >
            <span className="card-title text-title truncate">
              {favourite.title}
            </span>
            <p className="text-description truncate">
              {favourite.description}
            </p>
            <hr />
            <p className="text-description truncate">
            Posted { moment(new Date(favourite.createdAt)).fromNow()}
            </p>
          </div>
          <div
            className="card-action black-text center grey lighten-4"
            style={{ margin: 1 }}
          >
            <a className="black-text">
              <i
                className="fa fa-thumbs-o-up"
                aria-hidden="true"
              > {favourite.upvotes}
              </i>
            </a>
            <a
              className="black-text"
            >
              <i
                className="fa fa-thumbs-o-down"
                aria-hidden="true"
              > {favourite.downvotes}
              </i>
            </a>
            <a className="black-text">
              <i
                className="fa fa-eye"
                aria-hidden="true"
              > {favourite.views}
              </i>
            </a>
            <a
              className="black-text"
              onClick={() =>
                  this.handelFavourites(favourite.id, favourite.title)}
              style={{ cursor: 'pointer' }}
            >
              <i
                className="fa fa-heart red-heart"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
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
  }).isRequired,
  addOrRemoveFavourite: PropTypes.func.isRequired
};

export default UserFavouriteCard;
