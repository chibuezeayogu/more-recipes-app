const voting = (state = [], action) => {
    switch(action.type){
        case 'UP_VOTE_RECIPE' :
            return state;
        case 'DOWN_VOTE_RECIPE' :
            return state;
        default:
            return state;
        }
};

export default voting;  