
const initialState = {
    pagenation: {},
    recipes: {},
    message:{}
};


const recipes = (state = initialState, action) => {
    switch(action.type){
        case 'GET_ALL_RECIPES_SUCCESS' :
            state ={
                pagenation: action.data.pagenation,
                recipes: action.data.recipes
            };
            return state;
        case 'ADD_RECIPE_SUCCESS' :
            console.log(state, action);
            return {state: action.data};   
        case 'DELETE_RECIPE_SUCCESS' :
            console.log(state, action);
            return state;
        case 'MODIFY_RECIPES' :
            console.log(state, action);
            return state;
        default:
            return state;
        }
    };


export default recipes;  