import React, { Component } from 'react';
import { Row, Input, Icon, Button, Col, Pagination} from 'react-materialize';
import Recipes from './Recipes';
import jwtDecode from 'jwt-decode';


class  RecipesGrid extends Component{
    constructor(props){
        super(props);
    }
componentWillMount(){
    const Token = localStorage.getItem("jwtToken");
    if(!Token){
        this.context.router.push("/signin");
    }
    else{
        this.props.getAllRecipes();
    }
    }
    
    render() {
       
        const { recipes } = this.props.recipes;
        return (
            <div className="container" >
                {recipes.map((recipes, id)=> 
                    <div className="s12 m8 l4 left bd">
                        {/* <Row> */}
                        <Recipes {...this.props} key={id} id={id}  /> 
                        <img className="responsive-img img-wh-grid z-depth-3" src={recipes.imageUrl} alt="" /> 
                        <p>
                        <h5>{recipes.title}</h5>
                        <h6>{recipes.description}</h6>
                            <i className="tiny material-icons">thumb_up</i>
                            {recipes.upvotes}
                            <i className="tiny material-icons">thumb_down</i>
                            {recipes.downvotes}
                            <i className="fa fa-eye tiny"></i>
                            {recipes.views}</p>
                        {/* </Row> */}
                    </div>
                        )
                }
            </div>
        );
    }
}

RecipesGrid.contextTypes = {
    router: React.PropTypes.object
};
export default RecipesGrid;