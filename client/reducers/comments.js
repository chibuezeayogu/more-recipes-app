const comments = (state = [], action) => {
    switch(action.type){
        case 'COMMENT_POSTED_SUCCESSFULLY' :
            return state;
        case 'COMMENT_DELETED_SUCCESSFULLY' :
            return state;
        case 'ERROR_POSTING_COMMENT' :
            return state;
        case 'ERROR_DELETING_COMMENT' :
            return state;
        default:
            return state;
        }
    };

export default comments;  
