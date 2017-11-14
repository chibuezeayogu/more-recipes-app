---
title: More-Recipe API
language_tabs:
  - javascript
toc_footers:
  - <span>&copy; Andela, developed by Chibueze Ayogu</span>
includes:
  - userdata
  - recipedata
  - voting
  - favourites
  - reviews
search: true
---
# Introduction
More-Recipe API contains several API end points that allows users to signup, signin, add, retrieve, edit, and delete recipe. User can also upvote or downvote a recipe, add recipe to his/her favourite or remove from his/her favourite, get recipes with most upvote in ascending order.  It also offers a way to ensure that only authorized users can perform certain operations.
## Development
The application was developed with [NodeJs](http://nodejs.org/) and [Express](http://expressjs.com/) is used for routing. The [Postgresql](http://postgresql.com/) database was used with sequelize as the ORM
## Installation
Follow the steps below to setup a local development environment. First ensure you have [Postgresql](https://www.postgresql.org/) installed, and a version of [Node.js](http://nodejs.org/) equal or greater than v6.8.0.

1. Clone the repository from a terminal `git clone https://github.com/chibuezeayogu/Cohort-XXVI_More-RecipesApp.git`.
2. Move into the project directory `cd Cohort-XXVI_More-RecipesApp`
3. Add`.env` and add any preferred postgresql DB_URL.
4. Install project dependencies `npm install`
5. Start the express server `npm start`.

## How to use JWT for Authentication or Authorization

This document management system uses "email & password" to authenticate users while generating token. To use the token returned after successful signin.
1. Save the token to the browser local storage or session storage with a property name "Authorization". Eg. `Authentication: token. `This gives users the priviledge to certain resources they have permission to.

2. If using Postman to test the routes, copy the token from the login or sign up response to the headers with key name "Authorization",Eg. `Authorization: token` which allows users to access resources they have permission to.

## API Summary
### Userdata
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/v1/users/signup     |   Creates a new user.
POST /api/v1/users/signup     |   Logs in a user.
GET /api/v1/users             |   Retreives a logged in user's Profile based on the users id. 
PUT /api/v1/users             |   Updates any logged in user's Profile  except email based on the users id

### Recipedata
EndPoint                   |   Functionality
---------------------------|------------------------
POST /api/v1/recipes/:id   |   Creates a new recipe. (available only to logged in users)
GET /api/v1/recipes        |   Gets all recipes. (available only to logged in users)
GET /api/v1/recipes/:id    |   Find a recipe by id. (available only to logged in users)
PUT /api/v1/recipes/:id    |   Updates a recipe attributes. (available only to the users who added the recipe)
DELETE /api/v1/recipes/:id |   Delete a recipe. (available only to the users who added the recipe)
GET /api/recipes?sort=upvotes&order=descending | Get all documents with title containing the search query (available only to logged in users)

### Favourite
EndPoint                         |   Functionality
---------------------------------|------------------------
PUT /api/v1/users/:id/add        |  Add a recipe to users favourite. (available only to logged in users)
PUT /api/v1/users/:id/remove     |  Revove a recipe from users favourite. (available only to logged in users)
GET /api/users/<userId>/recipe   |  Get all users favourite recipes. (available only to logged in users)


### Voting
EndPoint                            |   Functionality
------------------------------------|------------------------
PUT /api/v1/recipes/:id/upvote      |   Upvote a recipe. (available only to logged in users)
PUT /api/v1/recipes/:id/downupvote  |   downvote a recipe. (available only to logged in users)

### Reviews
EndPoint                              |   Functionality
--------------------------------------|------------------------
POST /api/recipes/<recipeId>/reviews  |   Post review for a recipe. (available only to logged in users)
