import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
 
import userData from './user';
import recipes from './recipes';
import comments from './comments';
import favourite from './favourite';
import voting from './Voting';

const rootReducer = combineReducers({
    recipes, comments, favourite, voting, userData, routing: routerReducer
});

export default rootReducer;