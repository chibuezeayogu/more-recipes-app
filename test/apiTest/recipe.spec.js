import chai from 'chai';
import http from 'chai-http';
import app from '../../app';
import models from '../../server/models/';

const expect = chai.expect;
chai.use(http);
let token;

describe('Recipes', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'chibuezeayogu@hotmail.com', password: 'Password1.@' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  describe('POST: /api/v1/recipes', () => {
    it('should return an error message if no authorization token was found', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return an error message if title is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: '',
          description: 'Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: '350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: 'Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['title is required', 'title must at least contain a word without leading space']);
          done();
        });
    });
    it('should return an error message if title is supplied with leading space', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: ' Nigerian Beans Recipes',
          description: 'Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: '350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: 'Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['title must at least contain a word without leading space']);
          done();
        });
    });
    it('should return an error message if description is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: '',
          ingredients: '350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: 'Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['description is required', 'description must at least contain a word without leading space']);
          done();
        });
    });
    it('should return an error message if description is supplied with leading space', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: ' Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: '350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: 'Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['description must at least contain a word without leading space']);
          done();
        });
    });
    it('should return an error message if ingredients is not suipplied', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: 'Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: '',
          procedures: 'Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['ingredients is required', 'ingredients must at least contain a word without leading space']);
          done();
        });
    });
    it('should return an error message if ingredients is suipplied leading empty space', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: 'Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: ' 350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: 'Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['ingredients must at least contain a word without leading space']);
          done();
        });
    });
    it('should return an error messsage if procedures is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: 'Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: '350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: '',
          imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['procedures is required', 'procedures must at least contain a word without leading space']);
          done();
        });
    });
    it('should return an error messsage if procedures is supplied with leading space', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: 'Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: '350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: ' Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['procedures must at least contain a word without leading space']);
          done();
        });
    });
    it('should return an error messsage if imageUrl is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: 'Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: '350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: 'Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['image url is required', 'image url is not valid']);
          done();
        });
    });
    it('should return an error messsage if imageUrl is supplied but not valid', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: 'Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: '350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: 'Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: '//res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['image url is not valid']);
          done();
        });
    });
    it('should add a new recipe if title, description, ingredients, procedures, and imageUrl are all suppled and validated', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: 'Nigerian Fried Beans is so delicious that even those who do not like beans enjoy it! The closest Nigerian meal is Ewa Agoyin',
          ingredients: '350g brown or black-eyed beans, 2 Onions, 3 cooking spoons palm oil or more, 1 big stock cube, Salt & Habanero pepper (to taste) Water',
          procedures: 'Pour 1 1/2 cups water, orange juice, lemon juice, rice vinegar, and soy sauce into a saucepan and set over medium-high heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped onion, and red pepper flakes. Bring to a boil. Remove from heat, and cool 10 to 15 minutes',
          imageUrl: 'https://res.cloudinary.com/chibuezeayogu/image/upload/v1509851506/ubrx24qk7sgqhdz4q5pr.jpg'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('Added successfully');
          done();
        });
    });
  });
  describe('GET: /recipes/:id', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return a message `Please input a valid id.` if recipe id is not of type integer', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/s')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid id.']);
          done();
        });
    });
    it('should return a message `Recipe not found` if recipe is not found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/5')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found');
          done();
        });
    });
    it('should return a `recipe` if recipe is found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
  describe('PUT: /recipes/:id', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return a `Please input a valid id.` message if recipe id is not of type integer', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/s')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid id.']);
          done();
        });
    });
    it('should return a message `Updated Successfully` and `recipe` if a user updates a recipe he or she added', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1')
        .set({ Authorization: token })
        .send({ title: 'Nigerian Beans Recipe' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('Updated Successfully');
          done();
        });
    });
    it('should return a `Operation not allowed. You can only update your recipe` message if a user tires to modify a recipe he/she didn\'t add', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/2')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Operation not allowed. You can only update your recipe');
          done();
        });
    });
  });
  describe('DELETE: /recipes/:id', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .del('/api/v1/recipes/1')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return a `Please input a valid id.` message if recipe id is not of type integer', (done) => {
      chai.request(app)
        .del('/api/v1/recipes/s')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid id.']);
          done();
        });
    });
    it('should return a message `Operation not allowed. You can only delete your recipe` if a user tires to delete a recipe he or she didn\'t add', (done) => {
      chai.request(app)
        .del('/api/v1/recipes/2')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Operation not allowed. You can only delete your recipe');
          done();
        });
    });
    it('should return a message `Delete Successfull` if a user deletes his or her recipe', (done) => {
      chai.request(app)
        .del('/api/v1/recipes/1')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Delete Successfully');
          done();
        });
    });
  });
  describe('GET: /api/v1/recipes', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return all recipes with pagination', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?limit=2&offset=0')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['pagination', 'recipes']);
          done();
        });
    });
    it('should return an error message if limit or offset is not of type integer', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?limit=1.3&offset=0')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          done();
        });
    });
  });
  describe('GET: /api/v1/recipes', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/search?title=water')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return `pagenation` and `recipes` that match the searchterm', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/search?title=recipe')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['pagination', 'recipes']);
          done();
        });
    });
    it('should return a message `Search term did not match any recipe` if no match was found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/search?title=monkey')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Search term did not match any recipe');
          done();
        });
    });
  });
  describe('GET: /api/v1/users/:userId/recipes', () => {
    it('should return a message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/recipes')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return a message `Please input a valid userId.` if user id is not of type int', (done) => {
      chai.request(app)
        .get('/api/v1/users/s/recipes')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys('message');
          expect(res.body.message).to.eql(['Please input a valid userId.']);
          done();
        });
    });
    it('should return a message `User is not authenticated` if user is not authenticated ', (done) => {
      chai.request(app)
        .get('/api/v1/users/6/recipes')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys('message');
          expect(res.body.message).to.eql('User is not authenticated');
          done();
        });
    });
    it('should return an error message if limit or offset is not of type integer', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/recipes?limit=1.3&offset=0')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          done();
        });
    });
    it('should return `pagenation` and `recipes` if a user have added recipes', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/recipes')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['pagination', 'recipes']);
          done();
        });
    });
  });
});
