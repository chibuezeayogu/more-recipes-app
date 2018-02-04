import chai from 'chai';
import http from 'chai-http';
import app from '../../server/app';
import models from '../../server/models/';

const expect = chai.expect;
chai.use(http);
let token;

describe('Recipe', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'chibuezeayogu@hotmail.com', password: 'Password1.@' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('Add Recipe', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
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
          description: `Nigerian Fried Beans is so delicious that even those 
            who do not like beans enjoy it!`,
          ingredients: `350g brown or black-eyed beans, 2 Onions, 3 cooking 
            spoons palm oil or more, 1 big stock cube, Salt & Habanero 
            pepper (to taste) Water`,
          procedures: `Pour 1 1/2 cups water, orange juice, lemon juice, rice 
            vinegar, and soy sauce into a saucepan and set over medium-high 
            heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped 
            onion, and red pepper flakes. Bring to a boil.`,
          imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['title is required',
            'title must be at least 5 characters long']);
          done();
        });
    });
    it('should return an error message if title is supplied with leading space',
      (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'reci',
          description: `Nigerian Fried Beans is so delicious that even those 
            who do not like beans enjoy it!`,
          ingredients: `350g brown or black-eyed beans, 2 Onions, 3 cooking 
            spoons palm oil or more, 1 big stock cube, Salt & Habanero 
            pepper (to taste) Water`,
          procedures: `Pour 1 1/2 cups water, orange juice, lemon juice, rice 
            vinegar, and soy sauce into a saucepan and set over medium-high 
            heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped 
            onion, and red pepper flakes. Bring to a boil.`,
          imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            ['title must be at least 5 characters long']
          );
          done();
        });
    });
    it('should return an error message if description is not supplied',
      (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: '',
          ingredients: `350g brown or black-eyed beans, 2 Onions, 3 cooking 
            spoons palm oil or more, 1 big stock cube, Salt & Habanero 
            pepper (to taste) Water`,
          procedures: `Pour 1 1/2 cups water, orange juice, lemon juice, rice 
            vinegar, and soy sauce into a saucepan and set over medium-high 
            heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped 
            onion, and red pepper flakes. Bring to a boil.`,
          imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['description is required',
            'description must be at least 5 characters long']);
          done();
        });
    });
    it(`should return an error message if description is less than
        5 characters`, (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: 'Nice',
          ingredients: `350g brown or black-eyed beans, 2 Onions, 3 cooking 
            spoons palm oil or more, 1 big stock cube, Salt & Habanero 
            pepper (to taste) Water`,
          procedures: `Pour 1 1/2 cups water, orange juice, lemon juice, rice 
            vinegar, and soy sauce into a saucepan and set over medium-high 
            heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped 
            onion, and red pepper flakes. Bring to a boil.`,
          imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            ['description must be at least 5 characters long']
          );
          done();
        });
    });
    it('should return an error message if ingredients is not suipplied',
      (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: `Nigerian Fried Beans is so delicious that even those 
            who do not like beans enjoy it!`,
          ingredients: '',
          procedures: `Pour 1 1/2 cups water, orange juice, lemon juice, rice 
            vinegar, and soy sauce into a saucepan and set over medium-high 
            heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped 
            onion, and red pepper flakes. Bring to a boil.`,
          imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['ingredients is required',
            'ingredients must be at least 5 characters long']);
          done();
        });
    });
    it(`should return an error message if ingredients is less than
      5 characters`, (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: `Nigerian Fried Beans is so delicious that even those 
            who do not like beans enjoy it!`,
          ingredients: 'ingr',
          procedures: `Pour 1 1/2 cups water, orange juice, lemon juice, rice 
            vinegar, and soy sauce into a saucepan and set over medium-high 
            heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped 
            onion, and red pepper flakes. Bring to a boil.`,
          imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            ['ingredients must be at least 5 characters long']
        );
          done();
        });
    });
    it('should return an error messsage if procedures is not supplied',
      (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: `Nigerian Fried Beans is so delicious that even those 
            who do not like beans enjoy it!`,
          ingredients: `350g brown or black-eyed beans, 2 Onions, 3 cooking 
            spoons palm oil or more, 1 big stock cube, Salt & Habanero 
            pepper (to taste) Water`,
          procedures: '',
          imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['procedures is required',
            'procedures must be at least 5 characters long']);
          done();
        });
    });
    it('should return an error messsage if procedures is less than 5 characters', 
      (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: `Nigerian Fried Beans is so delicious that even those 
            who do not like beans enjoy it!`,
          ingredients: `350g brown or black-eyed beans, 2 Onions, 3 cooking 
            spoons palm oil or more, 1 big stock cube, Salt & Habanero 
            pepper (to taste) Water`,
          procedures: 'proc',
          imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            ['procedures must be at least 5 characters long']
          );
          done();
        });
    });
    it('should return an error messsage if imageUrl is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: `Nigerian Fried Beans is so delicious that even those 
            who do not like beans enjoy it!`,
          ingredients: `350g brown or black-eyed beans, 2 Onions, 3 cooking 
            spoons palm oil or more, 1 big stock cube, Salt & Habanero 
            pepper (to taste) Water`,
          procedures: `Pour 1 1/2 cups water, orange juice, lemon juice, rice 
            vinegar, and soy sauce into a saucepan and set over medium-high 
            heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped 
            onion, and red pepper flakes. Bring to a boil.`,
          imageUrl: ''
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['image url is required',
            'image url is not valid']);
          done();
        });
    });
    it('should return an error messsage if imageUrl is supplied but not valid',
      (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: `Nigerian Fried Beans is so delicious that even those 
            who do not like beans enjoy it!`,
          ingredients: `350g brown or black-eyed beans, 2 Onions, 3 cooking 
            spoons palm oil or more, 1 big stock cube, Salt & Habanero 
            pepper (to taste) Water`,
          procedures: `Pour 1 1/2 cups water, orange juice, lemon juice, rice 
            vinegar, and soy sauce into a saucepan and set over medium-high 
            heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped 
            onion, and red pepper flakes. Bring to a boil.`,
          imageUrl: `//res.cloudinary.com/chibuezeayogu/image/upload/
            v1509851506/ubrx24qk7sgqhdz4q5pr.jpg `
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['image url is not valid']);
          done();
        });
    });
    it('should add a new recipe if all fields suppled and validated',
      (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set({ Authorization: token })
        .send({
          title: 'Nigerian Beans Recipes',
          description: `Nigerian Fried Beans is so delicious that even those 
            who do not like beans enjoy it!`,
          ingredients: `350g brown or black-eyed beans, 2 Onions, 3 cooking 
            spoons palm oil or more, 1 big stock cube, Salt & Habanero 
            pepper (to taste) Water`,
          procedures: `Pour 1 1/2 cups water, orange juice, lemon juice, rice 
            vinegar, and soy sauce into a saucepan and set over medium-high 
            heat. Stir in the orange zest, brown sugar, ginger, garlic, chopped 
            onion, and red pepper flakes. Bring to a boil.`,
          imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
          v1509851506/ubrx24qk7sgqhdz4q5pr.jpg`
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['message', 'recipe']);
          expect(res.body.message).to.eql('Added successfully');
          done();
        });
    });
  });

  describe('GET Recipe', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
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
    it('should return an error message if recipe id is not of type integer',
      (done) => {
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
    it('should return an error message if recipe is not found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/100')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found');
          done();
        });
    });
    it('should return `recipe` if recipe is found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/1')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('Update Recipe', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
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
    it('should return an error message if recipe id is not of type integer',
      (done) => {
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
    it('should return updated recipe if a user updates a recipe', (done) => {
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
    it(`should return an error message if a user tires to modify a recipe 
      he/she didn\'t add`, (done) => {
      chai.request(app)
        .put('/api/v1/recipes/2')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            'Operation not allowed. You can only update your recipe'
          );
          done();
        });
    });
  });

  describe('Delete Recipe', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
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
    it('should return an error message if recipe id is not of type integer',
      (done) => {
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
    it(`should return an error message if a user tires to delete a recipe
      he or she didn\'t add`, (done) => {
      chai.request(app)
        .del('/api/v1/recipes/2')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            'Operation not allowed. You can only delete your recipe'
          );
          done();
        });
    });
    it('should return a message if a user deletes his/her recipe', (done) => {
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

  describe('Get All Recipes', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
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
    it(`should return an error message if limit or offset is not of
      type integer`,(done) => {
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

  describe('Search Recipes', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
      chai.request(app)
        .get('/api/v1/recipes/search?q=water')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return pagianted recipes that match the searchterm', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/search?q=recipe')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['pagination', 'recipes']);
          done();
        });
    });
    it('should return an error message if no match was found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/search?q=monkey')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            `Search term did not match any recipe`);
          done();
        });
    });
  });

  describe('Get User Recipes', () => {
    it(`should return an error message if no authorization token was found`,
      (done) => {
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
    it(`should return an error message if user id is not of type integer`,
      (done) => {
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
    it('should return an error message if user is not authenticated',
      (done) => {
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
    it(`should return an error message if limit or offset is not of type
      integer`, (done) => {
      chai.request(app)
        .get('/api/v1/users/1/recipes?limit=1.3&offset=0')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          done();
        });
    });
    it('should return recipes user has added recipes', (done) => {
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
