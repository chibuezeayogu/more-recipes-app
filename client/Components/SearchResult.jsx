import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from './RecipeCard.jsx';
import Preloader from './Preloder.jsx';

class SearchResult extends Component {
  render() {
    const { recipes } = this.props.searchResultReducer;
    if (!recipes) {
        return (
          <div 
            className="row left align-recipe"
            style={{ width: '100%' }}>
            
          </div>
        );
    }
    if (recipes && recipes.length === 0 ) {
      return (
        <div
          id="noSearchFound"
          className="row left"
          style={{ width: '100%' }}>
          <h4 className="center-align">No result found</h4>
      </div>
      )
    } else if (recipes && recipes.length > 0 ){
      return (
        <div 
          className="row left align-recipe"
          style={{ width: '100%' }}>
          {recipes ? recipes.map((recipe, i) => <RecipeCard
          {...this.props}
          key={i}
          recipe={recipe} />) : ''}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  userData: state.userData
});

export default SearchResult;
