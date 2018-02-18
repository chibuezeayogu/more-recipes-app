
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './Routes';
import verifyToken from './util/verifyToken';
import store from './store';


import './Style/Style.scss';
import '../node_modules/rc-pagination/assets/index.css';

verifyToken(store);

const App = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Routes />
      </div>
    </BrowserRouter>
  </Provider>
);

render(App, document.getElementById('root'));
