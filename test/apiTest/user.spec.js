import chai from 'chai';
import http from 'chai-http';
import app from '../../server/app';
import models from '../../server/models/';
import mockData from '../MockData/userMockData';

const expect = chai.expect;
chai.use(http);

let token;
describe('User:', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({ email: 'chibuezeayogu@hotmail.com', password: 'Password1.@' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });
  describe('User Sign Up', () => {
    it(`should return an error message if first name is not
      supplied`, (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(mockData.firstNameNotSupplied)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['first name is required',
            'first name must be at least 3 characters long']);
          done();
        });
    });
    it(`should return an  error message if first name lenght is less than
      3 character`, (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(mockData.firstNameLengthError)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            ['first name must be at least 3 characters long']
          );
          done();
        });
    });
    it('should return an error message if last name is not supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .send(mockData.lastNameNotSupplied)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql(['last name is required',
              'last name must be at least 3 character long']);
            done();
          });
      });
    it(`should return an error message if last name is less than
      3 character`, (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(mockData.lastNameLengthError)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            ['last name must be at least 3 character long']
          );
          done();
        });
    });
    it('should return an error message if email is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(mockData.emailNotSupplied)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            ['email is required', 'email is not valid']
          );
          done();
        });
    });
    it('should return an error message if invalid email is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .send(mockData.invalidEmailError)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql(['email is not valid']);
            done();
          });
      });
    it('should return an error message when password is not supplied!',
      (done) => {
        chai.request(app)
          .post('/api/v1/users/signup')
          .send(mockData.passwordNotSupplied)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql(['password is required',
              'password must be at least 8 characters long']);
            done();
          });
      });
    it(`should return an error message if password length is less that 8
      character`, (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(mockData.passwordLengthError)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            ['password must be at least 8 characters long']
          );
          done();
        });
    });
    it(`should return an error message if password did meet required
      condition`, (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(mockData.passwordVAlidationError)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(
            'password must contain uppercase, lowercase, number, and special character'
          );
          done();
        });
    });
    it('should registered user successfully', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(mockData.registerUser)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(['message', 'token']);
          expect(res.body.message).to.eql('Registered successfully');
          done();
        });
    });
    it('should return an error message if user already exists.', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(mockData.registerUser)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql('User already exists.');
          done();
        });
    });
  });

  describe('User Sign In', () => {
    it('should return an message if user is not registered', (done) => {
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
    it('should return an error message if email is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({ email: '', password: 'ikenna123' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys(['message']);
          expect(res.body.message).to.eql(['email is required']);
          done();
        });
    });
    it('should return an error message if password is not supplied', (done) => {
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
    it('should return an error message if wrong credentials is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({ email: 'okoro@hotmail.com', password: 'wrong123456' })
          .end((err, res) => {
            expect(res.status).to.equal(409);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('Invalide username or password');
            done();
          });
      });
    it('should log in a user and return a token', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send({ email: 'chibuezeayogu@hotmail.com', password: 'Password1.@' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message', 'token']);
          expect(res.body.message).to.eql('Logged in Successfully');
          done();
        });
    });
  });

  describe('Get User', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
        chai.request(app)
          .get('/api/v1/users/1')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.keys(['status', 'message']);
            expect(res.body.status).to.eql('Failed');
            expect(res.body.message).to.eql('No token provided.');
            done();
          });
      });
    it('should return a message if user id is not of type int', (done) => {
      chai.request(app)
        .get('/api/v1/users/e')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys('message');
          expect(res.body.message).to.eql(['Please input a valid userId.']);
          done();
        });
    });
    it(`should return an error message if unauthenticated user tries to
      perform am action`, (done) => {
      chai.request(app)
        .get('/api/v1/users/4')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys('message');
          expect(res.body.message).to.eql('User is not Authorized!.');
          done();
        });
    });
    it('should return the details of a registered user', (done) => {
      chai.request(app)
        .get('/api/v1/users/1')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys('user');
          done();
        });
    });
  });

  describe('Update User', () => {
    it('should return an error message if no authorization token was found',
      (done) => {
        chai.request(app)
          .put('/api/v1/users/1')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).to.have.keys(['status', 'message']);
            expect(res.body.status).to.eql('Failed');
            expect(res.body.message).to.eql('No token provided.');
            done();
          });
      });
    it('should return a message if user id is not of type int', (done) => {
      chai.request(app)
        .put('/api/v1/users/e')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.keys('message');
          expect(res.body.message).to.eql(['Please input a valid userId.']);
          done();
        });
    });
    it(`should return an error message if unauthenticated user tries to
      perform am action`, (done) => {
      chai.request(app)
        .put('/api/v1/users/3')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.keys('message');
          expect(res.body.message).to.eql('User is not Authorized!.');
          done();
        });
    });
    it('should return an error message if a user tries to change his email',
      (done) => {
        chai.request(app)
          .put('/api/v1/users/1')
          .set({ Authorization: token })
          .send({
            firstName: 'Chibueze',
            lastName: 'Ayogu',
            email: 'new@hotmail.com',
            imageUrl: `https://res.cloudinary.com/chibuezeayogu/image/upload/
            v1509613064/ll3ej6sclaadc2wcyjdf.jpg`
          })
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body).to.have.keys(['message']);
            expect(res.body.message).to.eql('email cannot be changed');
            done();
          });
      });
    it('should return an updated details of a registered user', (done) => {
      chai.request(app)
        .put('/api/v1/users/1')
        .set({ Authorization: token })
        .send({ firstName: 'Nelson' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.keys(['message', 'user']);
          expect(res.body.message).to.eql('Updated successfully');
          expect(res.body.user.firstName).to.eql('Nelson');
          done();
        });
    });
  });
});
