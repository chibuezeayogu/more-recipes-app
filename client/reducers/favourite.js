const favourite = (state = [], action) => {
    switch(action.type){
        case 'ADD_FROM_FAVOURITE' :
            return state;
        case 'REMOVE_FROM_FAVOURITE' :
            return state;
        default:
            return state;
        }
};

export default favourite;  