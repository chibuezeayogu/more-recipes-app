# Cohort-XXVI_More-RecipesApp
[![Build Status](https://travis-ci.org/chibuezeayogu/Cohort-XXVI_More-RecipesApp.svg?branch=develop)](https://travis-ci.org/chibuezeayogu/Cohort-XXVI_More-RecipesApp)
[![Coverage Status](https://coveralls.io/repos/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp/badge.svg?branch=develop)](https://coveralls.io/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp?branch=develop)
[![Code Climate](https://codeclimate.com/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp/badges/gpa.svg)](https://codeclimate.com/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp)
[![Issue Count](https://codeclimate.com/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp/badges/issue_count.svg)](https://codeclimate.com/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp)

# Introduction 

More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt. 

# Features of More Recipe API

# This API has the following features.
-JSON Web Token (JWT) is used to authenticate users.
- API creates a token everytime a user logs in.
- user supplies the token created, which is verified by the API before the user can access certain protected endpoints.

# Users

-New users can sign up.
-Signed up users can login and get an authentication token.
-Users can update their details e.g. Firstname, Lastname.

# More Recipe

-Logged in users can add a recipe.
-Users can view, update, and delete their recipe.
-Users cannot update and/or delete other users' recipe.

# Search
-Users can search for and retrieve any recipe once he/she is logged in.


# Technologies

 `NodeJS:`is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

`es6(ECMAScript 2015)`: es6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, etc.

`Express`: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

`Postgres`: PostgreSQL is a powerful, open source object-relational database system. It is used to persist dockument API's data.

`Babel`: Babel is used to transpile es6 down to es5.

`Sequelize`: Sequelize is a promise-based Obect Relational Mapper (ORM) for Node.js and io.js.

`Mocha`: Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha is the testing framework used to test the API's functionalities.



# Resources

JSON Web Token (JWT): JWT is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. JWT is used for secure login.

# Limitations

-Users cannot sign in through social authentication.
-There's no frontend.


# Author
Chibueze Ayogu
