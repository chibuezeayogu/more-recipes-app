import React, { Component } from 'react';
import { Link } from 'react-router';

class Recipes extends Component {
    render(){
        const { recipes } = this.props.recipes;
        return(
            <figure>
                <Link to={`/${recipes.id}/recipe`}>
                    {recipes.title}
                    <img src={recipes.image} />
                    {recipes.description}
                </Link>
            </figure>
        );
    }
}

export default Recipes;