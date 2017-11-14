import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../action/actionCreators';
import Main from './Main';
  
const mapStateToProps = (state) => {
    return {
        recipes: state.recipes, 
        comments: state.comments, 
        favourite: state.favourite, 
        voting: state.voting, 
        userData: state.userData   
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch);
};

const InjectData = connect (mapStateToProps, mapDispatchToProps)(Main);

export default InjectData; 