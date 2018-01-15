import chai from 'chai';
import http from 'chai-http';
import app from '../../app';
import models from '../../server/models/';

const should = chai.should();
chai.use(http);

const expect = chai.expect;
chai.use(http);
let token;

describe('Favourites', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'chibuezeayogu@hotmail.com', password: 'Password1.@' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  describe('GET: /api/v1/users/:userId/favouriteRecipes', () => {
    it('should return an message `No token provided.` if no authorization token was found', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/favouriteRecipes')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return a message `Please input a valid userId.` if invalid user id is supplied', (done) => {
      chai.request(app)
        .get('/api/v1/users/e/favouriteRecipes')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid userId.']);
          done();
        });
    });
    it('should return a message `User is not authenticated` if user is not authenticated', (done) => {
      chai.request(app)
        .get('/api/v1/users/5/favouriteRecipes')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('User is not authenticated');
          done();
        });
    });
  });
  describe('PUT: /api/v1/recipes/:id/addRemoveFavourite', () => {
    it('should return a message `No token provided.`if no authorization token was found', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/1/addRemoveFavourite')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys(['status', 'message']);
          expect(res.body.status).to.eql('Failed');
          expect(res.body.message).to.eql('No token provided.');
          done();
        });
    });
    it('should return a message `Please input a valid id.` if invalid recipe id is supplied', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/s/addRemoveFavourite')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['Please input a valid id.']);
          done();
        });
    });
    it('should return a message `Recipe not found!` if recipe was not found', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/10/addRemoveFavourite')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found!');
          done();
        });
    });
    it('should return a message `Added to your favourite` if a user adds a recipe to his or her favourite', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/2/addRemoveFavourite')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Added to your favourite');
          done();
        });
    });
    it('should return a message `Removed from your favourite` if a user removes a recipe from his favourite', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/2/addRemoveFavourite')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Removed from your favourite');
          done();
        });
    });
  });
});
