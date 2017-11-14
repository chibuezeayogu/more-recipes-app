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
    describe('PUT: /api/v1/recipes/:id/addfavourite', () => {
        it('should return an error message if no authorization token was found', (done) => {
            chai.request(app)
              .put('/api/v1/recipes/1/addfavourite')
              .end((err, res) => {
                expect(res.status).to.equal(403);
                expect(res.body).to.have.keys(['status', 'message']);
                expect(res.body.status).to.eql('Failed');
                expect(res.body.message).to.eql('No token provided.');
                done();
              });
          });
        it('should return an error message if no recipe id is supplied', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/s/addfavourite')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['Please input a valid id.']);
              done();
            });
        });
        it('should return an error message if no recipe was not found', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/10/addfavourite')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Recipe not found!');
            done();
            });
        });
        it('should return a success message if a user adds a recipe to his or her favourite', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/2/addfavourite')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Successfully added to your favourite');
            done();
            });
        });
        it('should return a message if a user tries to adds the same recipe to his favourite again', (done) => {
            chai.request(app)
            .put('/api/v1/recipes/2/addfavourite')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Recipe already added to your favourite');
            done();
            });
        });
    });
    describe('DELETE: /api/v1/users/:id/remove', () => {
        it('should return an error message if no authorization token was found', (done) => {
            chai.request(app)
              .del('/api/v1/recipes/6/removefavourite')
              .end((err, res) => {
                expect(res.status).to.equal(403);
                expect(res.body).to.have.keys(['status', 'message']);
                expect(res.body.status).to.eql('Failed');
                expect(res.body.message).to.eql('No token provided.');
                done();
              });
          });
        it('should return an error message if no recipe id is supplied', (done) => {
            chai.request(app)
            .del('/api/v1/recipes/d/removefavourite')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['Please input a valid id.']);
              done();
            });
        });
        it('should return an error message if recipe id supplied was not found', (done) => {
            chai.request(app)
            .del('/api/v1/recipes/6/removefavourite')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('Recipe not found!');
              done();
            });
        });
        it('should return a message if a user removes a recipe from his or her favourite', (done) => {
            chai.request(app)
            .del('/api/v1/recipes/2/removefavourite')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Recipe has been removed from your favourite');
            done();
            });
        });
        it('should return an error message if a user tries to remove a recipe not in his or her favourite', (done) => {
            chai.request(app)
            .del('/api/v1/recipes/2/removefavourite')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Recipe is not in your favourite');
            done();
            });
        });
    });
 });