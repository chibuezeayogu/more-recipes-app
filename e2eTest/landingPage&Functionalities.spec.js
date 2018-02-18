
export default {
  'Landing Page should be displayed with all element and atrributes ':
  (client) => {
    client
      .url('http://localhost:26000')
      .waitForElementVisible('body', 2000)
      .assert.title('More Recipe')
      .assert.visible('nav')
      .assert.visible('.main')
      .assert.visible('.center.teal-text.white-text')
      .assert.visible('footer')
      .pause(2000)
      .click('.fa.fa-user-plus')
      .assert.urlEquals('http://localhost:26000/signup')
      .assert.visible('h4.center', 'Create Account')
      .assert.visible('.btn.right.green', 'Sign Up')
      .pause(2000);
  },
  'Sign up should fail if user supplies invalid input': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/signup')
      .assert.visible('h4.center', 'Create Account')
      .assert.title('More Recipe')
      .assert.visible('#firstName')
      .setValue('#firstName', '')
      .assert.visible('#lastName')
      .setValue('#lastName', '')
      .assert.visible('#email')
      .setValue('#email', '')
      .assert.visible('#password')
      .setValue('#password', '')
      .assert.visible('#fileSelect')
      .click('.btn.right.green')
      .pause(4000)
      .assert.visible('#firstName')
      .setValue('#firstName', 'ay')
      .assert.visible('#lastName')
      .setValue('#lastName', 'ay')
      .assert.visible('#email')
      .setValue('#email', 'wrongmail.com')
      .assert.visible('#password')
      .setValue('#password', '12344567')
      .assert.visible('#fileSelect')
      .assert.visible('#password')
      .setValue('#password', 'Computer12.')
      .click('.btn.right.green')
      .pause(3000);
  },
  'Sign up user with all the neccessary information provided': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/signup')
      .assert.visible('h4.center', 'Create Account')
      .assert.title('More Recipe')
      .clearValue('#firstName')
      .assert.visible('#firstName')
      .setValue('#firstName', 'Chibueze')
      .clearValue('#lastName')
      .assert.visible('#lastName')
      .setValue('#lastName', 'Ayogu')
      .clearValue('#email')
      .assert.visible('#email')
      .setValue('#email', 'chibueszeayogu@hotmail.com')
      .clearValue('#password')
      .assert.visible('#password')
      .setValue('#password', 'Abcd.1234.@')
      .assert.visible('#fileSelect')
      .setValue('#fileSelect',
        require('path').resolve(`${__dirname}/../client/img/myprofile.jpg`))
      .click('.btn.right.green')
      .pause(9000);
  },
  'It should navigate to all recipes page if account creation was successful':
    (client) => {
      client
        .assert.urlEquals('http://localhost:26000/recipes')
        .assert.visible('h4.center', 'Recipes')
        .assert.visible('h4.center-align', 'This page has no recipe')
        .click('#displayEmail')
        .pause(1000)
        .assert.visible('#logout')
        .pause(1000)
        .click('#logout')
        .pause(2000);
    },
  'Sign in should fail for empty fields and unregistered user': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/signin')
      .assert.visible('h4.center', 'Welcome Back')
      .assert.visible('.btn.right.green.form-margin', 'Login')
      .pause(2000)
      .assert.visible('#email')
      .setValue('#email', '')
      .assert.visible('#password')
      .setValue('#password', '')
      .assert.visible('#login')
      .click('#login')
      .pause(3000)
      .assert.visible('#email')
      .setValue('#email', 'unregisteredUser@hotmail.com')
      .assert.visible('#password')
      .setValue('#password', '12333333333')
      .assert.visible('#login')
      .click('#login')
      .pause(3000);
  },
  'Sign in should fail if user supplies invalid login credentials':
    (client) => {
      client
        .assert.urlEquals('http://localhost:26000/signin')
        .assert.visible('h4.center', 'Welcome Back')
        .assert.visible('.btn.right.green.form-margin', 'Login')
        .pause(2000)
        .clearValue('#email')
        .assert.visible('#email')
        .setValue('#email', 'chibueszeayogu@hotmail.com')
        .clearValue('#password')
        .assert.visible('#password')
        .setValue('#password', 'Abcd.1234.@888')
        .assert.visible('#login')
        .click('#login')
        .pause(3000);
    },
  'Sign in a registered user': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/signin')
      .assert.visible('h4.center', 'Welcome Back')
      .assert.visible('.btn.right.green.form-margin', 'Login')
      .pause(2000)
      .clearValue('#email')
      .assert.visible('#email')
      .setValue('#email', 'chibueszeayogu@hotmail.com')
      .clearValue('#password')
      .assert.visible('#password')
      .setValue('#password', 'Abcd.1234.@')
      .assert.visible('#login')
      .click('#login')
      .pause(3000);
  },
  'Navigate to all recipes page when user logs in successfully': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/recipes')
      .assert.visible('h4.center', 'Recipes')
      .assert.visible('h4.center-align', 'This page has no recipe')
      .pause(2000);
  },
  'Create recipe should fail if input conditions are not meet': (client) => {
    client
      .pause(2000)
      .assert.visible('.fa.fa-plus')
      .click('.fa.fa-plus')
      .assert.urlEquals('http://localhost:26000/addrecipe')
      .pause(2000)
      .assert.visible('.main')
      .assert.visible('.container')
      .assert.visible('.addrecipe-form')
      .assert.visible('h4.center', 'Add Recipe')
      .assert.visible('#title')
      .setValue('#title', '')
      .assert.visible('#description')
      .setValue('#description', '')
      .assert.visible('#ingredients')
      .setValue('#ingredients', '')
      .assert.visible('#procedures')
      .setValue('#procedures', '')
      .assert.visible('#file')
      .setValue('#file', '')
      .assert.visible('#post', 'Post')
      .click('#post')
      .pause(4000)
      .assert.visible('#title')
      .setValue('#title', 'Eg')
      .assert.visible('#description')
      .setValue('#description', 'The')
      .assert.visible('#ingredients')
      .setValue('#ingredients', '44 ')
      .assert.visible('#procedures')
      .setValue('#procedures', 'Bef')
      .assert.visible('#file')
      .assert.visible('#post', 'Post')
      .click('#post')
      .pause(4000);
  },
  'User should be able to add a recipe': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/addrecipe')
      .pause(2000)
      .assert.visible('.main')
      .assert.visible('.container')
      .assert.visible('.addrecipe-form')
      .assert.visible('h4.center', 'Add Recipe')
      .clearValue('#title')
      .assert.visible('#title')
      .setValue('#title', 'Egusi recipe')
      .clearValue('#description')
      .assert.visible('#description')
      .setValue('#description', 'The Egusi Soup recipe described on this' +
      ' page is the Fried Method of preparing Nigerian Egusi Soup')
      .clearValue('#ingredients')
      .assert.visible('#ingredients')
      .setValue('#ingredients', '4 cups (500g) Egusi (Melon) seeds;' +
        ' 3 cooking spoons red palm oil')
      .clearValue('#procedures')
      .assert.visible('#procedures')
      .setValue('#procedures', 'Before preparing the soup; soak the dry' +
      'fish and stock fish till soft; If you are using the very tough stockfish')
      .assert.visible('#file')
      .setValue('#fileSelect',
        require('path').resolve(`${__dirname}/../client/img/recipe.jpg`))
      .assert.visible('#post', 'Post')
      .click('#post')
      .pause(3000);
  },
  'Navigate to all recipes page if user successfully creates a recipe':
    (client) => {
      client
        .url('http://localhost:26000/recipes')
        .assert.visible('h4.center', 'Recipes')
        .pause(3000)
        .assert.visible('.responsive-img.img-height')
        .pause(3000)
        .assert.visible('.fa.fa-plus')
        .click('.fa.fa-plus')
        .pause(2000);
    },
  'User should be able to add another recipe': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/addrecipe')
      .pause(2000)
      .assert.visible('.main')
      .assert.visible('.container')
      .assert.visible('.addrecipe-form')
      .assert.visible('h4.center', 'Add Recipe')
      .clearValue('#title')
      .assert.visible('#title')
      .setValue('#title', 'Spaghetti Cacio e Pepe')
      .clearValue('#description')
      .assert.visible('#description')
      .setValue('#description', 'This is a recipe that we have made in our' +
      ' family for many years everyone loves it')
      .clearValue('#ingredients')
      .assert.visible('#ingredients')
      .setValue('#ingredients', '1 pound spaghetti; 6 tablespoons olive oil;' +
      ' 2 cloves garlic, minced; 2 teaspoons ground black pepper; 1 3/4 cups' +
      'grated Pecorino Romano cheese')
      .clearValue('#procedures')
      .assert.visible('#procedures')
      .setValue('#procedures', 'Bring a large pot of lightly salted water to' +
      'a boil. Cook spaghetti in the boiling water, stirring occasionally' +
      'until tender yet firm to the bite, about 10 minutes. Scoop out some' +
      'of the cooking water and reserve. Drain spaghetti; Heat oil in a' +
      'large skillet over medium heat. Add garlic and pepper; cook and' +
      'stir until fragrant, 1 to 2 minutes. Add spaghetti and Pecorino' +
      'Romano cheese. Ladle in 1/2 cup of reserved cooking water; stir' +
      'until cheese is melted, about 1 minute; Add more cooking water' +
      'until sauce coats spaghetti, about 1 minute more')
      .assert.visible('#file')
      .setValue('#fileSelect',
        require('path').resolve(`${__dirname}/../client/img/spaghetti.jpg`))
      .assert.visible('#post', 'Post')
      .click('#post')
      .pause(3000);
  },
  'Navigate to recipes page if user successfully creates a second recipe':
    (client) => {
      client
        .assert.urlEquals('http://localhost:26000/recipes')
        .assert.visible('h4.center', 'Recipes')
        .pause(2000)
        .assert.visible('.responsive-img.img-height')
        .click('.responsive-img.img-height')
        .pause(2000);
    },
  'View Recipes Details': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/recipes/2')
      .pause(3000)
      .assert.visible('h4.center', 'Recipe Details')
      .assert.visible('#upvote')
      .click('#upvote')
      .pause(3000)
      .assert.visible('#downvote')
      .click('#downvote')
      .pause(3000)
      .assert.visible('#addFavourite')
      .click('#addFavourite')
      .pause(3000)
      .click('#upvote')
      .pause(2000)
      .assert.visible('#comment')
      .setValue('#comment', '')
      .click('#commentButton')
      .pause(2000)
      .setValue('#comment', 'awe')
      .click('#commentButton')
      .pause(2000)
      .clearValue('#comment')
      .setValue('#comment', 'awesome recipe')
      .click('#commentButton')
      .pause(2000)
      .click('#displayEmail')
      .pause(2000)
      .assert.visible('#myFavourite')
      .click('#myFavourite')
      .pause(3000);
  },
  'User should be able to view and remove his/her favourite recipe':
  (client) => {
    client
      .assert.urlEquals('http://localhost:26000/user/favourites')
      .pause(2000)
      .assert.visible('.main')
      .assert.visible('.container')
      .assert.visible('.row')
      .assert.visible('h4.center', 'Favourite Recipes')
      .assert.visible('.fa.fa-heart.red-heart')
      .click('.fa.fa-heart.red-heart')
      .pause(3000)
      .assert
      .visible('button.swal-button.swal-button--confirm.swal-button--danger')
      .pause(3000)
      .click('button.swal-button.swal-button--confirm.swal-button--danger')
      .pause(2000)
      .assert.visible('.fa.fa-search')
      .click('.fa.fa-search')
      .pause(3000);
  },
  'User should be albe to search for recipes': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/search')
      .assert.visible('.main')
      .assert.visible('.container')
      .assert.visible('#search')
      .pause(3000)
      .setValue('#search', 'Egusi')
      .pause(3000)
      .click('#displayEmail')
      .pause(3000)
      .assert.visible('#myRecipes')
      .click('#myRecipes')
      .pause(4000);
  },
  'User should be able to view his/her recipe page': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/user/recipes')
      .assert.visible('h4.center', 'My Recipes')
      .pause(2000)
      .assert.visible('.main')
      .assert.visible('.container')
      .assert.visible('.row')
      .assert.visible('h4.center', 'My Recipes')
      .assert.visible('.row.left.align-recipe')
      .click('.fa.fa-pencil-square-o.black-text')
      .pause(2000);
  },
  'User should be able to edit his/her recipe': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/user/recipes/2/edit')
      .pause(2000)
      .assert.visible('h4.center', 'Edit Recipe')
      .pause(3000)
      .assert.visible('#title')
      .assert.visible('#description')
      .assert.visible('#ingredients')
      .assert.visible('#procedures')
      .pause(2000)
      .clearValue('#title')
      .pause(2000)
      .setValue('#title', 'Spaghetti Cacio')
      .assert.visible('.btn.right.green', 'Update')
      .clearValue('#description')
      .pause(2000)
      .setValue('#description',
        'This is a recipe that we have made in our family for many years')
      .pause(2000)
      .click('.btn.right.green')
      .pause(3000);
  },
  'User should be able to delete his/her recipe': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/user/recipes')
      .pause(2000)
      .assert.visible('.main')
      .assert.visible('.container')
      .assert.visible('.row')
      .assert.visible('h4.center', 'My Recipes')
      .assert.visible('.row.left.align-recipe')
      .assert.visible('.fa.fa-trash')
      .click('.fa.fa-trash')
      .pause(3000)
      .assert
      .visible('button.swal-button.swal-button--confirm.swal-button--danger')
      .pause(3000)
      .click('button.swal-button.swal-button--confirm.swal-button--danger')
      .pause(2000)
      .click('#displayEmail')
      .pause(2000)
      .assert.visible('#profile')
      .click('#profile')
      .pause(3000);
  },
  'User should be able to view and edit his/her profile': (client) => {
    client
      .assert.urlEquals('http://localhost:26000/user/profile')
      .pause(3000)
      .assert.visible('h4.center', 'Profile')
      .assert.visible('#firstName')
      .assert.visible('#lastName')
      .assert.visible('#phone')
      .assert.visible('#location')
      .assert.visible('#address')
      .assert.visible('#edit', 'Edit')
      .assert.visible('#update', 'Update')
      .assert.visible('#cancel', 'Cancel')
      .click('button#edit')
      .pause(2000)
      .setValue('#phone', '07033497338')
      .pause(1000)
      .setValue('#location', 'Maryland, Lagos')
      .pause(1000)
      .setValue('#address', 'No 1 Aminu Street, Mende')
      .pause(1000)
      .click('button#update')
      .pause(3000)
      .click('#displayEmail')
      .pause(1000)
      .assert.visible('#logout')
      .pause(1000)
      .click('#logout')
      .pause(2000)
      .end();
  },
};
