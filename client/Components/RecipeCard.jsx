import React from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

/**
 *
 * @description displays each recipe
 *
 * @method
 *
 * @param {Object} props - property object
 *
 *  @returns {Undefined}
 */
const RecipeCard = (props) => {
  const { recipe } = props;
  return (
    <div className="col s12 m6 l4">
      <div className="card hoverable">
        <Link to={`/recipes/${recipe.id}`}>
          <img
            src={recipe.imageUrl}
            alt=""
            className="responsive-img img-height"
            style={{ width: '100%' }}
          />
        </Link>
        <div 
          className="card-content black-text grey lighten-5">
          <span className="card-title text-title truncate">
            {recipe.title}
          </span>
          <p className="text-description truncate">
            {recipe.description}
          </p>
          <hr />
          <p className="text-description truncate">
            Posted { moment(new Date(recipe.createdAt)).fromNow()}
          </p>
        </div>
        <div className="card-action black-text center grey lighten-4"
          style={{ margin: 5 }}>
          <a className="black-text">
              <i className="fa fa-thumbs-up" 
              aria-hidden="true"> {recipe.upvotes}
              </i>
          </a>
          <a className="black-text">
            <i className="fa fa-thumbs-o-down" aria-hidden="true"> {recipe.downvotes}
            </i>  
          </a>
          <a className="black-text">
            <i className="fa fa-eye" aria-hidden="true"> {recipe.views}
            </i>
          </a>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }).isRequired
};

export default RecipeCard;
