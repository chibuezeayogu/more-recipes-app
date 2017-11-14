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
          .send({ email: 'chibuezeayogu@hotmail.com', password: 'computer123' })
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
    describe('PUT: /api/v1/recipes/:id/upvote', () => {
        it('should return an error message if no authorization token was found', (done) => {
            chai.request(app)
              .put('/api/v1/recipes/1/upvote')
              .end((err, res) => {
                expect(res.status).to.equal(403);
                expect(res.body).to.have.keys(['status', 'message']);
                expect(res.body.status).to.eql('Failed');
                expect(res.body.message).to.eql('No token provided.');
                done();
              });
          });
        it('should return an error message if recipe id supplied is not of type integer', (done) => {
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
        it('should return an error message if invalid recipe id is supplied', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/20/upvote')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('Recipe not found');
              done();
            });
        });
      it('should return a success message if a user upvotes a recipe for the first time', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/3/upvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Successfully upvoted');
          done();
          });
      });
      it('should return an error message if a user tries to upvotes a recipe for the second time', (done) => {
          chai.request(app)
          .put('/api/v1/recipes/3/upvote')
          .set({ Authorization: token })
          .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('You have already upvoted this recipe.');
          done();
          });
      });
      it('should return a success message if a user downvotes a recipe', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/3/downvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Successfully downvoted');
          done();
          });
      });
      it('should return a success message if a user upvotes after successful downvote', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/3/upvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Successfully upvoted');
          done();
          });
      });
    });
    describe('GET: /api/v1/recipes/mostupvote', () => {
      it('should return an error message if no authorization token was found', (done) => {
        chai.request(app)
          .get('/api/v1/recipes/mostupvote')
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body).to.have.keys(['status', 'message']);
            expect(res.body.status).to.eql('Failed');
            expect(res.body.message).to.eql('No token provided.');
            done();
          });
      });
      it('should return recipes with the most upvotes', (done) => {
        chai.request(app)
          .get('/api/v1/recipes/mostupvote')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.keys(['recipe']);
            done();
          });
      });
    });
    describe('PUT: /api/v1/recipes/:id/downvote', () => {
      it('should return an error message if no authorization token was found', (done) => {
        chai.request(app)
          .put('/api/v1/recipes/3/downvote')
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body).to.have.keys(['status', 'message']);
            expect(res.body.status).to.eql('Failed');
            expect(res.body.message).to.eql('No token provided.');
            done();
          });
      });
      it('should return an error message if recipe id supplied is not of type integer', (done) => {
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
      it('should return an error message if recipe was not found', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/10/downvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Recipe not found');
          done();
        });
      });
      it('should return a success message if a user downvotes a recipe for the first time', (done) => {
          chai.request(app)
          .put('/api/v1/recipes/3/downvote')
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
        .put('/api/v1/recipes/3/downvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('You have already downvoted this recipe.');
          done();
        });
      });
      it('should return a success message if a user upvotes a recipe he downvoted previously', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/3/upvote')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('Successfully upvoted');
          done();
          });
      });
      it('should return a success message if a user downvotes a recipe after previous upvote', (done) => {
        chai.request(app)
        .put('/api/v1/recipes/3/downvote')
        .set({ Authorization: token })
        .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.keys(['message']);
        expect(res.body.message).to.eql('Successfully downvoted');
        done();
        });
    });
  });
});
  