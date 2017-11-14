import React, { Component } from 'react';
import { Link } from 'react-router';

const SingleRecipe = React.createClass ({
    render(){
        const { recipes } = this.props;
        return(
            <div class="col s12 m2">
                <figure>
                i am the single
                </figure>
            </div>
        );
    }
});

export default SingleRecipe;