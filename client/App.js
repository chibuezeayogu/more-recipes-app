// import dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// import component
import SignIn from './Components/SignIn.jsx';
import SignUp from './Components/SignUp.jsx';
import Main from './Components/Main.jsx';
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
      </Switch>
    </BrowserRouter>
  </Provider>
);

render(App, document.getElementById('root'));
