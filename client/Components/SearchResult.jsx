import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard.jsx';


class SearchResult extends Component {
  render() {
    const { recipes } = this.props.searchReducer;
    if (recipes && recipes.length === 0) {
      return (
        <div
          id="noSearchFound"
          className="row left"
          style={{ width: '100%' }}
        >
          <h4 className="center-align">No result found</h4>
        </div>
      );
    } else if (recipes && recipes.length > 0) {
      return (
        <div
          className="row left align-recipe"
          style={{ width: '100%' }}
        >
          {recipes ? recipes.map((recipe, i) => (<RecipeCard
            {...this.props}
            key={i}
            recipe={recipe}
          />)) : ''}
        </div>
      );
    }
  }
}

SearchResult.propTypes = {
  searchReducer: PropTypes.shape({
    recipes: PropTypes.shape({
      id: PropTypes.number.isRequired,
      upvotes: PropTypes.number.isRequired,
      downvotes: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};


export default SearchResult;
