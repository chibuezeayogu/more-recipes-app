---
title: More-Recipe API Reference
language_tabs:
  - javascript
toc_footers:
  - <span>&copy; Andela, developed by Chibueze Ayogu</span>
includes:
  - userdata
  - recipes
  - favourite
  - voting
  - reviews
search: true
---
# Introduction
More-Recipe API contains several API end points that allows users to signup, signin, add, retrieve, edit, delete, upvote, and downvote a recipe. And also adds a recipe to users favourite, removes a recipe from users favourite. It also offers a way to ensure that only authenticated users can perform certain operations.
## Development
The application was developed with [NodeJs](http://nodejs.org/) and [Express](http://expressjs.com/) is used for routing. The [Postgresql](http://postgresql.com/) database was used with sequelize as the ORM
## Installation
Follow the steps below to setup a local development environment. First ensure you have [Postgresql](https://www.postgresql.org/) installed, and a version of [Node.js](http://nodejs.org/) equal or greater than v6.8.0.

1. Clone the repository from a terminal `git clone https://github.com/chibuezeayogu/Cohort-XXVI_More-RecipesApp.git`.
2. Move into the project directory `cd Cohort-XXVI_More-RecipesApp`
3. Add `.env` and add any preferred postgresql DB_URL.
4. Install project dependencies `npm install`
5. Start the express server `npm start`.

## How to use JWT for Authentication or Authorization

This document management system uses "username/email & password" to authenticate users while generating token. To use the token returned after successful login or creation of user.
1. Save the token to the browser local storage or session storage with a property name "Authorization". Eg. `Authentication: token. `This gives users the priviledge to certain resources they have permission to.

2. If using Postman to test the routes, copy the token from the login or sign up response to the headers with key name "Authorization",Eg. `Authorization: token` which allows users to access resources they have permission to.

## API Summary
### Userdata
EndPoint                        |   Functionality
-----------------------------|----------------------------------
POST /api/v1/users/signup    |   Creates a new user.
POST /api/v1/users/signin    |   Logs in a User.
GET /api/v1/users            |   Creates a new user.
GET /api/v1/users            |   Finds user by id.
PUT /api/v1/users            |   Updates a user's attributes based on the id 


### Recipe
EndPoint                     |   Functionality
-----------------------------|-----------------------------------
POST /api/v1/recipes         |   Creates a new recipe.
GET /api/v1/recipes          |   Gets all recipes.
GET /api/v1/recipes/:id      |   Find a recipe by id.
PUT /api/v1/recipes/:id      |   Updates a recipe attributes. (available only to the person who added the recipe)
DELETE /api/v1/recipes/:id     | Delete a recipe. (available only to the person who added the recipe)
GET /api/v1/recipes/mostupvote | Get all recipes with the most upvotes in descending order.

### Favourite
EndPoint                           |   Functionality
-----------------------------------|-----------------------------------
PUT /api/v1/recipes/:id/add        |   Add a recipe a users favourite.
PUT /api/v1/recipes/:id/remove     |   Remove a recipe a users favourite.
GET /api/v1/users/:userId/recipes  |   Get all favourte recipe of a user.

### Voting
EndPoint                           |   Functionality
-----------------------------------|-----------------------------------
PUT /api/v1/recipes/:id/upvote     |   Upvotes a recipe.
PUT /api/v1/recipes/:id/downvote   |   Downvotes a recipe.

### Reviews
EndPoint                           |   Functionality
-----------------------------------|-----------------------------------
POST /api/v1/recipes/:id/upvote    |   Post a review for a recipe.
