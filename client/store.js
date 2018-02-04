import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
 import rootReducer from './reducers/index.js';
 import rootSaga from './sagas/index.js';


let enhancers;

const env =  process.env.NODE_ENV || 'development';
if (env === 'production'){
  enhancers = [];
} else {
  enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
}

const sagaMiddleware = createSagaMiddleware();  
const store = createStore(rootReducer, enhancers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
 