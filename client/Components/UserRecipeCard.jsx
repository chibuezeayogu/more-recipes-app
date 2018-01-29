import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
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
 *  @returns {void}
 */
class UserRecipeCard extends Component {

  handelEditRecipe(id) {
    this.props.history.push(`/user/recipes/${id}/edit`);
   }

  handelDeleteRecipe(id, title) {
    swal({
      title: "Are you sure?",
      text: `You want to delete "${title}"!`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.delRecipe(id);
      } 
    });
  }


  render() {
    const token = localStorage.getItem('jwtToken');
    const { user } = jwtDecode(token);
    const { recipe } = this.props;
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
          <div 
            className="card-action black-text grey lighten-4 center"
            style={{ margin: 5 }}>
            <a className="black-text">
              <i 
                className="fa fa-thumbs-o-up" 
                  aria-hidden="true"> {recipe.upvotes}
              </i>     
            </a>
            <a 
              className="black-text">
              <i 
                className="fa fa-thumbs-o-down" 
                  aria-hidden="true"> {recipe.downvotes}
              </i>  
            </a>
            <a 
              className="black-text" 
              onClick={() => this.handelEditRecipe(recipe.id)}
              style={{ cursor: 'pointer' }}
              >
                <i 
                  className="fa fa-pencil-square-o black-text"
                  
                  aria-hidden="true" /> 
            </a>

            <a 
              className="black-text" 
                onClick={() => this.handelDeleteRecipe(recipe.id, recipe.title)}
                style={{ cursor: 'pointer' }}
              >
              <i 
                className="fa fa-trash" 
                  aria-hidden="true" /> 
            </a>
          </div>
        </div>
      </div>
    );
  };
}

UserRecipeCard .propTypes = {
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

export default UserRecipeCard;
