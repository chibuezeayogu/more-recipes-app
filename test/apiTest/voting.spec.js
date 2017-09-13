import app from '../../app';
import chai from 'chai';
import http from 'chai-http';
import models from '../../server/models/';

const should  = chai.should();
 chai.use(http);

const expect = chai.expect;
chai.use(http);
let token;
    
    describe('Recipes', () => {
      before((done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({ email: 'chibuezeayogu@hotmail.com', password: 'computer' })
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
    describe('PUT: /api/v1/recipes/:id/upvote', () => {
        it('should return a message if no recipe id is supplied', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/s/upvote')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['Please input a valid id.']);
              done();
            });
        });
        it('should return a message if invalid recipe id is supplied', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/20/upvote')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('Recipe data not found');
              done();
            });
        });
        it('should return a message if a user tries to upvotes a recipe for the second time', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/1/upvote')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('You have already upvoted this recipe.');
            done();
            });
        });
    });
    describe('PUT: /api/v1/recipes/:id/downvote', () => {
        it('should return a message if no recipe id is supplied', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/s/downvote')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['Please input a valid id.']);
              done();
            });
        });
        it('should return a message if a user downvotes a recipe for the first time', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/1/downvote')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Successfully downvoted');
            done();
            });
        });
        it('should return a message if a user tries to downvotes a recipe for the second time', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/1/downvote')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('You have already downvoted this recipe.');
            done();
            });
        });
    });
 });
  