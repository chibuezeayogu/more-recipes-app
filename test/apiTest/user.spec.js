import app from '../../app';
import chai from 'chai';
import http from 'chai-http';
import models from '../../server/models/';

const should  = chai.should();
 chai.use(http);

const expect = chai.expect;
chai.use(http);

let token;
    
    describe('Userdata', () => {
      before((done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({ email: 'chibuezeayogu@hotmail.com', password: 'computer' })
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
      describe('POST: /api/v1/users/signin', () => {
        it('should return a message when a user did not fill his/her email', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({ email: '', password: 'ikenna' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['email is required',
                                               'email is not valid']);
              done();
            });
        });
        it('should return a message when a user did not fill his/her password', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({ email: 'okoro@hotmail.com', password: '' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['password is required']);
              done();
            });
        });
      it('should return a message when user supplies a wrong password', (done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({ email: 'okoro@hotmail.com', password: 'wrong' })
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Password mismatch');
            done();
          });
        });
        it('should log in a user and return a token', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin').send({ email: 'okoro@hotmail.com', password: 'ikenna' }).end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.have.keys(['message', 'token']);
              expect(res.body.message).to.eql('Logged in Successfully');
              done();
            });
        });
      });
    });
