import { createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { setAuthorizationToken } from './util/setAuthToken';

 import rootReducer from './reducers/index.js';
 import rootSaga from './sagas/index.js';


 const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

 const sagaMiddleware = createSagaMiddleware();  
 const store = createStore(rootReducer, enhancers, applyMiddleware(sagaMiddleware));
 sagaMiddleware.run(rootSaga);
 

export const history = syncHistoryWithStore(browserHistory, store);

setAuthorizationToken(localStorage.jwtToken);

 if(module.hot) {
    module.hot.accept('./reducers/', () => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
export default store;