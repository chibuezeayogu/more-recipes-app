//add recipe
export const addRecipe = (title, description, ingredients, procedures, imageURL) => {
    return {
        type: 'ADD_RECIPE',
        title, 
        description, 
        ingredients, 
        procedures,
        imageURL
    };
};

// //modify recipe
// export const modifyRecipe = (RecipeId) =>{
//     return {
//         type: 'MODIFY_RECIPE',
//         RecipeId
//     }
// }

// //delete recipe 
// export const delRecipe = (RecipeId) =>{
//     return {
//         type: 'DELETE_RECIPE',
//         RecipeId
//     }
    
// }

// //upvote a recipe
// export const upVoteRecipe = (RecipeId) => {
//     return {
//         type: 'UP_VOTE_RECIPE',
//         RecipeId
//     }
    
// }

// //downvote a recipe
// export const downVoteRecipe = (RecipeId) => {
//     return {
//         type: 'DOWN_VOTE_RECIPE',
//         RecipeId
//     }
// }

// //add to favorite 
// export const addToFavourite = (RecipeId) => {
//     return {
//         type: 'ADD_TO_FAVOURITE',
//         RecipeId
//     }
// }

// //remove from favourite
// export const removeFromFavourite = (RecipeId) => {
//     return {
//         type: 'REMOVE_FROM_FAVOURITE',
//         RecipeId
//     }
    
// }

//add comment
export const addComment = (RecipeId, PostedBy, Comment) => {
    return {
        type: 'POST_COMMENT',
        RecipeId,
        PostedBy,
        Comment
    };
};

//del comment
export const delComment = (RecipeId, PostedBy, Comment) => {
    return {
        type: 'DELETE_COMMENT',
        RecipeId,
        PostedBy,
        Comment
    };
};


//get all recipe
export const getAllRecipes = () =>{
    return {
        type: 'GET_ALL_RECIPES',
    };
};

export const login = (email, password) => {
    return {
        type: "SIGN_IN",
        email,
        password
    };
};
export const SignOut = () => {
    return {
        type: "logout"
    };
};




// export const loginSuccess = (data) =>{
//     return {
//         type: "SIGN_IN_SUCCESS",
//         message: data
//     }
// }

export const createAccount = (firstname, lastname, email, password, profileImageUrl) => {
    return {
        type: 'SIGN_UP',
        firstname,
        lastname,
        email,
        password,
        profileImageUrl
    };
};

// export const getUser = (userID) => {
//     return {
//         type: 'GET_USER',
//         userId
//     }
// }

// export const updateUser = (userID) => {
//     return {
//         type: 'UPDATE_USER',
//         userId
//     }
// }




