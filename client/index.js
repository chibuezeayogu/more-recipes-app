// import dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// import component
import SignIn from './Components/SignIn.jsx';
import SignUp from './Components/SignUp.jsx';
import Main from './Components/Main.jsx';
import RecipesList from './Components/RecipesList.jsx';
import UserRecipesList from './Components/UserRecipesList.jsx';
import NotFound from './Components/NotFound.jsx';
import AddRecipe from './Components/AddRecipe.jsx';
import SingleRecipe from './Components/SingleRecipe.jsx';
import UserFavouritesList from './Components/UserFavouritesList.jsx';
import store from './store';

// import scss stylesheet
import './Style/Style.scss';


const requireAuth = (replace) => {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    replace('/signin');
  }
};

const App = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/recipes/:id" component={SingleRecipe} onEnter={requireAuth} />
        <Route path="/recipes" component={RecipesList} onEnter={requireAuth} />
        <Route path="/addrecipe" component={AddRecipe} onEnter={requireAuth} />
        <Route path="/user/favourites" component={UserFavouritesList} onEnter={requireAuth} />
        <Route path="/user/recipes" component={UserRecipesList} onEnter={requireAuth} />
        <Route path="*" component={NotFound} onEnter={requireAuth} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

render(App, document.getElementById('root'));
