import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard.jsx';
import SmallPreloader from './SmallPreloader.jsx';


class SearchResult extends Component {
  render() {
    const { recipes } = this.props.searchReducer;
    if (!recipes) {
      return (
        <div
          className="row left align-recipe"
          style={{ width: '100%' }}
        >
          <SmallPreloader />
        </div>
      );
    }
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
    recipes: PropTypes.shape.isRequired
  }).isRequired
};


export default SearchResult;
