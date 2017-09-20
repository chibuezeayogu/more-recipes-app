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
          .send({ email: 'chibuezeayogu@hotmail.com', password: 'computer123' })
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
      describe('POST: /api/v1/users/signup', () => {
        it('should return a message when firstname not supplied', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'', lastname:'Ayogu', email: 'new@hotmail.com', password: '12345678' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['firstname is required', 'firstname must be at least 3 characters long']);
              done();
            });
        });
        it('should return a message if firstname lenght is less than 3 character', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'Ay', lastname:'Ayogu', email: 'new@hotmail.com', password: '12345678' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['firstname must be at least 3 characters long']);
              done();
            });
        });
        it('should return a message when lastname is not supplied', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'', email: 'new@hotmail.com', password: '12345678' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['lastname is required', 'lastname must be at least 3 characters long']);
              done();
            });
        });
        it('should return a message when lastname lenght is less than 3 character', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'AB', email: 'new@hotmail.com', password: '12345678' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['lastname must be at least 3 characters long']);
              done();
            });
        });
        it('should return a message when email is not supplied', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'Ayogu', email: '', password: '12345678' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['email is required', 'email is not valid']);
              done();
            });
        });
        it('should return a message when password is not supplied!!', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'Ayogu', email: 'new@hotmail.com', password: '' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['password is required', 'Password must be at least 8 characters and at most 32 characters long']);
              done();
            });
        });
        it('should return a message when password contains empty space', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'Ayogu', email: 'new@hotmail.com', password: ' ' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['Password must be at least 8 characters and at most 32 characters long']);
              done();
            });
        });
        it('should return a message when registered successfully', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'Chibueze', lastname:'Ayogu', email: 'new@hotmail.com', password: '12345678' })
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.have.keys(['message', 'userInfo']);
              expect(res.body.message).to.eql('Registered successfully');
              expect(res.body.userInfo.id).to.equal(3);
              expect(res.body.userInfo.firstname).to.eql('Chibueze');
              expect(res.body.userInfo.lastname).to.equal('Ayogu');
              expect(res.body.userInfo.email).to.equal('new@hotmail.com');
              done();
            });
        });
      });
      describe('POST: /api/v1/users/signin', () => {
        it('should return a message when a user is not registered', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({ email: 'notRegister@hotmail.com', password: '12345678' })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('User is not registered!.');
              done();
            });
        });
        it('should return a message when a user did not fill his/her email', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({ email: '', password: 'ikenna123' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['email is required',
                                               'email is not valid']);
              done();
            });
        });
        it('should return a message when password field contains empty space', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({ email: 'okoro@hotmail.com', password: ' ' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['password must be at least 8 characters and at most 32 characters long']);
              done();
            });
        });
        it('should return a message when user supplies a wrong password', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({ email: 'okoro@hotmail.com', password: 'wrong123456' })
            .end((err, res) => {
              expect(res.status).to.equal(409);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('Password mismatch');
              done();
          });
        });
        it('should log in a user and return a token', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin').send({ email: 'okoro@hotmail.com', password: 'ikenna123' }).end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.have.keys(['message', 'token']);
              expect(res.body.message).to.eql('Logged in Successfully');
              done();
            });
        });
      });
    });
