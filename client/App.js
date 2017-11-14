//import dependencies
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';


//import component
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import InjectData from './Components/InjectData';
import AddRecipe from './Components/AddRecipe';
import RecipesGrid from './Components/RecipesGrid';
import SingleRecipe from './Components/SingleRecipe';
import store, { history } from './store';

const requireAuth = (nextState, replace) => {
    const token = localStorage.getItem('jwtToken');
    if(!token){
        replace('/signin');
    }

};


const App =  (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={InjectData}>
                <IndexRoute component={Home}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/addrecipe" component={AddRecipe} onEnter={requireAuth}/>
                <Route path="/recipes" component={RecipesGrid} onEnter={requireAuth}/>
                <Route path="/:id/recipe" component={SingleRecipe} onEnter={requireAuth}/>
            </Route>
        </Router>
    </Provider>

);


render (App,  document.getElementById('root')); 
