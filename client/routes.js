
import React from 'react';
import { render } from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import SignIn from './Components/SignIn.jsx';
import SignUp from './Components/SignUp.jsx';
import Main from './Components/Main.jsx';
import RecipesList from './Components/RecipesList.jsx';
import UserRecipesList from './Components/UserRecipesList.jsx';
import NotFound from './Components/NotFound.jsx';
import AddRecipe from './Components/AddRecipe.jsx';
import SingleRecipe from './Components/SingleRecipe.jsx';
import UserFavouritesList from './Components/UserFavouritesList.jsx';
import EditRecipe from './Components/EditRecipe.jsx';
import UserProfile from './Components/UserProfile.jsx';
import Search from './Components/Search.jsx';
import requireAuth from './util/requireAuth';


export default (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/search" component={requireAuth(Search)} />
    <Route exact path="/recipes/:id" component={requireAuth(SingleRecipe)}  />
    <Route exact path="/recipes" component={requireAuth(RecipesList)} />
    <Route exact path="/addrecipe" component={requireAuth(AddRecipe)} />
    <Route exact path="/user/favourites" component={requireAuth(UserFavouritesList)} />
    <Route exact path="/user/recipes/:id/edit" component={requireAuth(EditRecipe)} />
    <Route exact path="/user/recipes" component={requireAuth(UserRecipesList)} />
    <Route exact path="/user/profile" component={requireAuth(UserProfile)} />
    <Route path="*" component={requireAuth(NotFound)} />
  </Switch>
);
