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
    describe('PUT: /api/v1/users/:id/add', () => {
        it('should return a message if no recipe id is supplied', (done) => {
            chai.request(app)
            .put('/api/v1/users/s/add')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['Please input a valid id.']);
              done();
            });
        });
        it('should return a message if recipe id is not found', (done) => {
            chai.request(app)
            .put('/api/v1/users/5/add')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Recipe not found!');
            done();
            });
        });
        it('should return a message if a user adds a recipe to his/her favourite', (done) => {
            chai.request(app)
            .put('/api/v1/users/2/add')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Successfully added to you favourite');
            done();
            });
        });
        it('should return a message if a user tries to adds the same recipe to his favourite again', (done) => {
            chai.request(app)
            .put('/api/v1/users/2/add')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Recipe already added to your Favourite');
            done();
            });
        });
    });
    describe('DELETE: /api/v1/users/:id/remove', () => {
        it('should return a message if no recipe id is supplied', (done) => {
            chai.request(app)
            .del('/api/v1/users/s/remove')
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
            .del('/api/v1/users/20/remove')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('Recipe not found!');
              done();
            });
        });
        it('should return a message if a user removes a recipe from his/her favourite', (done) => {
            chai.request(app)
            .del('/api/v1/users/2/remove')
            .set({ Authorization: token })
            .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Recipe has been removed from your Favourite');
            done();
            });
        });
        it('should return a message if a user tries to remove the same recipe from his favourite again', (done) => {
            chai.request(app)
            .del('/api/v1/users/2/remove')
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