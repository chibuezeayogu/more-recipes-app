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
      describe('POST: /api/v1/users/signup', () => {
        it('should return an error message if firstname is not supplied', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'', lastname:'Ayogu', email: 'new@hotmail.com', password: '12345678', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg'})
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['firstname is required', 'firstname must be at least 3 characters long without space']);
              done();
            });
        });
        it('should return an error message if firstname lenght is less than 3 character', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'Ay', lastname:'Ayogu', email: 'new@hotmail.com', password: '12345678', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg'})
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['firstname must be at least 3 characters long without space']);
              done();
            });
        });
        it('should return an error message if lastname is not supplied', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'', email: 'new@hotmail.com', password: '12345678', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg'})
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['lastname is required', 'lastname must be at least 3 characters long without space']);
              done();
            });
        });
        it('should return an error message if lastname lenght is less than 3 character', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'AB', email: 'new@hotmail.com', password: '12345678', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['lastname must be at least 3 characters long without space']);
              done();
            });
        });
        it('should return an error message if email is not supplied', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'Ayogu', email:'', password: '12345678', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg'})
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['email is required', 'email is not valid']);
              done();
            });
        });
        it('should return an error message if invalid email is supplied', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'Ayogu', email: 'newhotmail.com', password: '12345678', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg'})
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['email is not valid']);
              done();
            });
        });
        it('should return a message when password is not supplied!!', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'Ayogu', email: 'new@hotmail.com', password: '', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg'})
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['password is required', 
                'Password must be at least 8 characters and at most 32 characters long without space']);
              done();
            });
        });
        it('should return an error message if password contains empty space', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'Ayogu', email: 'new@hotmail.com', password: ' ', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg'})
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['Password must be at least 8 characters and at most 32 characters long without space']);
              done();
            });
        });
        it('should return an error message if password length is less that 8', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'chibueze', lastname:'Ayogu', email: 'new@hotmail.com', password: '1234567', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['Password must be at least 8 characters and at most 32 characters long without space']);
              done();
            });
        });
        it('should return a success message if registered successfully', (done) => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send({ firstname:'Chibueze', lastname:'Ayogu', email: 'new@hotmail.com', password: '12345678', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg' })
            .end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.have.keys(['message', 'user']);
              expect(res.body.message).to.eql('Registered successfully');
              expect(res.body.user.id).to.equal(3);
              expect(res.body.user.firstname).to.eql('Chibueze');
              expect(res.body.user.lastname).to.equal('Ayogu');
              expect(res.body.user.email).to.equal('new@hotmail.com');
              expect(res.body.user.imageUrl).to.equal('http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg');
              done();
            });
        });
      });
      describe('POST: /api/v1/users/signin', () => {
        it('should return an error message if user is not registered', (done) => {
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
              expect(res.body.message).to.eql(['email is required', 'email is not valid']);
              done();
            });
        });
        it('should return a message when a user did not fill his/her email', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({ email: 'okorohotmail.com', password: 'ikenna123' })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql(['email is not valid']);
              done();
            });
        });
        it('should return an error message if password field contains empty space', (done) => {
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
        it('should return an error message if password field not up to the required space', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin')
            .send({ email: 'okoro@hotmail.com', password: '1234567'})
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
              expect(res.body.message).to.eql('Invalide username or password');
              done();
          });
        });
        it('should log in a user and return a token', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin').send({ email: 'okoro@hotmail.com', password: 'ikenna123' })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.have.keys(['message', 'token']);
              expect(res.body.message).to.eql('Logged in Successfully');
              done();
            });
        });
      });
      before((done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send({ email: 'chibuezeayogu@hotmail.com', password: 'computer123' })
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
      describe('GET: /api/v1/users', () => {
        it('should return an error message if no authorization token was found', (done) => {
          chai.request(app)
            .get('/api/v1/users')
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.have.keys(['status', 'message']);
              expect(res.body.status).to.eql('Failed');
              expect(res.body.message).to.eql('No token provided.');
              done();
            });
        });
        it('should return the details of a registered user', (done) => {
          chai.request(app)
            .get('/api/v1/users')
            .set({ Authorization: token })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.have.keys('user');
              expect(res.body.user.firstname).to.eql('Chibueze');
              expect(res.body.user.lastname).to.eql('Ayogu');
              expect(res.body.user.email).to.eql('chibuezeayogu@hotmail.com');
              expect(res.body.user.imageUrl).to.eql('http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg');
              done();
            });
        });
      });
      describe('PUT: /api/v1/users', () => {
        it('should return an error message if no authorization token was found', (done) => {
          chai.request(app)
            .put('/api/v1/users')
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.have.keys(['status', 'message']);
              expect(res.body.status).to.eql('Failed');
              expect(res.body.message).to.eql('No token provided.');
              done();
            });
        });
        it('should return an error message if a user tries to change his email', (done) => {
          chai.request(app)
            .put('/api/v1/users')
            .set({ Authorization: token })
            .send({ firstname:'Chibueze', lastname:'Ayogu', email:'new@hotmail.com', 
              imageUrl:'http://res.cloudinary.com/chibuezeayogu/image/upload/v1509613064/ll3ej6sclaadc2wcyjdf.jpg' })
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('email cannot be changed');
              done();
            });
        });
        it('should return a success message and an updated details of a registered user', (done) => {
          chai.request(app)
            .put('/api/v1/users')
            .set({ Authorization: token })
            .send({ firstname:'Nelson'})
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.have.keys(['message', 'user']);
              expect(res.body.message).to.eql('Updated successfully');
              expect(res.body.user.firstname).to.eql('Nelson');
              done();
            });
        });
      });
    });
