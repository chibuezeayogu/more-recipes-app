# Cohort-XXVI_More-RecipesApp
[![Build Status](https://travis-ci.org/chibuezeayogu/Cohort-XXVI_More-RecipesApp.svg?branch=develop)](https://travis-ci.org/chibuezeayogu/Cohort-XXVI_More-RecipesApp)
[![Coverage Status](https://coveralls.io/repos/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp/badge.svg)](https://coveralls.io/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp)
[![Code Climate](https://codeclimate.com/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp/badges/gpa.svg)](https://codeclimate.com/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp)
[![Issue Count](https://codeclimate.com/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp/badges/issue_count.svg)](https://codeclimate.com/github/chibuezeayogu/Cohort-XXVI_More-RecipesApp)

# Introduction 

More-Recipes provides a platform for users to share the awesome and exciting recipe ideas they have invented or learnt. 

# Features of More Recipe API

Authentication
* JSON Web Token (JWT) is used to authenticate users.
* The API creates a token everytime a user logs in.
* The user supplies the token created, which is verified by the API before the user can access certain protected endpoints.

### Users
* New users can sign up.
* Signed up users can login and get an authentication token.
* Users can update their details

### Recipes
* Authenticated users can create recipe.
* Authenticated users can edit/modify their recipe.
* Authenticated users can view all recipe.
* Authenticated users can delete only the recipe they created


### Review
* Authenticated users can post review for a recipe


### Voting
* Authenticated users can up vote or down vote a recipe

### Favourite
* Authenticated users can add or remove recipe from their favourite
* Users will get notification if their favourite recipe get modified

### Search
* Authenticated users can search for and retrieve any recipes based on the recipe title or ingredients 

## Usage
Click [here](https://more-recipes-api.herokuapp.com) to access the application. Or download or clone this repository and run it on your machine.

## For local installation & testing:
- If you don't have NodeJS already installed go here and install it.
- Clone this repository by running
- `git clone https://github.com/chibuezeayogu/Cohort-XXVI_More-RecipesApp.git` on your terminal.
- Navigate into the cloned project directory.
- For example, if you cloned the project into the desktop directory, then run cd desktop which takes you into the desktop, then `cd Cohort-XXVI_More-RecipesApp` to enter the project directory.
- Once in the project directory, install all project dependencies by running `npm install`.
- Run the command `npm run start:dev` to start the application.
- To run tests, run the command `npm test`.

# API Documentation
- The API Documentation can be found [here](https://more-recipes-api.herokuapp.com/API-Documentation/#introduction)

# Technologies

`NodeJS:`is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code server-side.

`es6(ECMAScript 2015)`: es6 is the sixth major release of the javascript language specification. It enables features like constants, arrow functions, template literals, etc.

`Express`: Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

`Postgres`: PostgreSQL is a powerful, open source object-relational database system. It is used to persist dockument API's data.

`Babel`: Babel is used to transpile es6 down to es5.

`Sequelize`: Sequelize is a promise-based Obect Relational Mapper (ORM) for Node.js and io.js.

`Mocha`: Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha is the testing framework used to test the API's functionalities.


# Contributing

Please read [this](https://github.com/chibuezeayogu/Cohort-XXVI_More-RecipesApp/wiki/Contributing) for details on code of conduct, and the process for submitting pull requests to me.
* Fork this repository by clicking the Fork menu item in the top right corner of this repository.
* Go to your github account, and under your repository list, you should find this project listed.
* Open the project, click on the clone or download button, then copy the url that pops up.
* Open your terminal and run the command git clone url where url is the url from the previous step.
* Navigate into the cloned project directory.
* For example, if you cloned the project into the desktop directory, then run cd desktop which takes you into the desktop, then cd Cohort-XXVI_More-RecipesApp
*  to enter the project directory.
* Once in the project directory, install all project dependencies by running npm install.
* Create your feature branch on your local machine by running `git checkout -b branchName`, where branchNameis the name of your feature branch.
* Make your changes.
* Add your changes by running git add filePath, where filePath is path of the file(s) in which the change(s) were made.
* Commit your changes by running `git commit -m "commit message"`.
* Push your changes to your remote branch by running `git push origin branchName`.
* Open a pull request to the staging branch.

# Resources

JSON Web Token (JWT): JWT is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. JWT is used for secure login.

# Limitations

- Users can only sign with their email and password.
- Users will be able to access the full application functionalities only if they are logged in

# License
- This project is authored by Ayogu Chibueze Nelson, and is licensed for use, distribution and modification under the ISC license

