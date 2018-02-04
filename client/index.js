
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import verifyToken from './util/verifyToken'; 
import store from './store';


import './Style/Style.scss';

verifyToken(store);

const App = (
  <Provider store={store}>
    <BrowserRouter>
      { Routes }
    </BrowserRouter>
  </Provider>
);

render(App, document.getElementById('root'));
