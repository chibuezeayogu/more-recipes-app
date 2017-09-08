process.env.NODE_ENV = 'test';
import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should  = chai.should();
 chai.use(chaiHttp);

 const expect = chai.expect;
    chai.use(http);
    
    const { admin, regularUser, incompleteLoginCredentials, fakeEsther, fakeUserDetails, updateUser, userPasswordMismatch } = data;
    
    let adminToken, regularUserToken;
    
    describe('Users', () => {
      before((done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send(admin)
          .end((err, res) => {
            adminToken = res.body.token;
            done();
          });
      });
      before((done) => {
        chai.request(app)
          .post('/api/v1/users/signin')
          .send(regularUser)
          .end((err, res) => {
            regularUserToken = res.body.token;
            done();
          });
      });
      after((done) => {
        models.User.destroy({ where: { id: { $notIn: [1, 2, 3, 4, 5] } } });
        done();
      });
      describe('user login endpoint', () => {
        it('should log in a user and return a token', (done) => {
          chai.request(app)
            .post('/api/v1/users/login').send(admin).end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.have.keys(['message', 'token']);
              expect(res.body.message).to.eql('login successful');
              done();
            });
        });
        it('should return a message for incomplete login details', (done) => {
          chai.request(app)
            .post('/api/v1/users/signin').send(incompleteLoginCredentials).end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('All fields are required');
              done();
            });
        });
        it('should return a message for password mismatch', (done) => {
          chai.request(app)
            .post('/api/v1/users/login').send(userPasswordMismatch).end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('Invalid login credentials. Try again.');
              done();
            });
        });
      });
      describe('user sign up endpoint', () => {
        it('should return a message for incomplete user details', (done) => {
          chai.request(app)
            .post('/api/v1/users/').send(fakeUserDetails).end((err, res) => {
              expect(res.status).to.equal(206);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('All fields are required.');
              done();
            });
        });
        it('should create a new user', (done) => {
          chai.request(app)
            .post('/api/v1/users/').send(fakeEsther).end((err, res) => {
              expect(res.status).to.equal(201);
              expect(res.body).to.have.keys(['message', 'user', 'token']);
              expect(res.body.message).to.eql('signup successful');
              done();
            });
        });
      });
      describe('get users', () => {
        it('should return all users if user is admin', (done) => {
          chai.request(app)
            .get('/api/v1/users')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(Array.isArray(res.body.allUsers));
              expect(res.body.allUsers.length).to.be.greaterThan(2);
              done();
            });
        });
        it('should return a message if a regular user accesses it', (done) => {
          chai.request(app)
            .get('/api/v1/users')
            .set({ 'Authorization': regularUserToken })
            .end((err, res) => {
              expect(res.status).to.equal(401);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('No authorization');
              done();
            });
        });
        it('should return all users if user is admin and limit and query is supplied', (done) => {
          chai.request(app)
            .get('/api/v1/users?limit=2&offset=0')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(Array.isArray(res.body.users));
              expect(res.body.users.length).to.be.greaterThan(1);
              expect(res.body).to.have.keys(['pagination', 'users']);
              done();
            });
        });
      });
      describe('find a user by id', () => {
        it('should return a user given an id', (done) => {
          chai.request(app)
            .get('/api/v1/users/1')
            .set({ Authorization: regularUserToken })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.have.keys(['name', 'email', 'role']);
              expect(res.body.name).to.eql('Baas Bank');
              expect(res.body.email).to.eql('baas@test.com');
              expect(res.body.role).to.eql('admin');
              done();
            });
        });
        it('should return a message for invalid user id', (done) => {
          chai.request(app)
            .get('/api/v1/users/jkfjdkjfld')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(err.response.text).to.eql(`invalid input syntax for integer: "jkfjdkjfld"`);
              done();
            });
        });
      });
      describe('update a user by id', () => {
        it('should allow a user update her profile', (done) => {
          chai.request(app)
            .put('/api/v1/users/1')
            .send(updateUser)
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(205);
              expect(res.body).to.have.keys(['message', 'user']);
              expect(res.body.message).to.eql('Update Successful!');
              expect(res.body.user.id).to.equal(1);
              expect(res.body.user.fullName).to.eql('Baas my man Bank');
              expect(res.body.user.email).to.eql('baasbank@test.com');
              done();
            });
        });
        it('should not allow a user update another user profile', (done) => {
          chai.request(app)
            .put('/api/v1/users/1')
            .send(updateUser)
            .set({ 'Authorization': regularUserToken })
            .end((err, res) => {
              expect(res.status).to.equal(403);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('You do not have permission to update.');
              done();
            });
        });
      });
      describe('delete a user by id', () => {
        it('should allow the admin delete a user', (done) => {
          chai.request(app)
            .delete('/api/v1/users/3')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(410);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('User deleted successfully.');
              done();
            });
        });
        it('should return a message for invalid user id', (done) => {
          chai.request(app)
            .delete('/api/v1/users/jkfjdkjfld')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(err.response.text).to.eql('Error. Please try again');
              done();
            });
        });
        it('should return a message for user id not in the database', (done) => {
          chai.request(app)
            .delete('/api/v1/users/5')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.eql('User does not exist');
              done();
            });
        });
      });
      describe('search for a user by name or email', () => {
        it('should allow the admin search for a user', (done) => {
          chai.request(app)
            .get('/api/v1/search/users?search=john')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.have.keys(['pagination', 'users']);
              expect(res.body.pagination.totalCount).to.equal(1);
              expect(res.body.users[0].fullName).to.eql('John Bosco');
              expect(res.body.users[0].email).to.eql('john@test.com');
              done();
            });
        });
        it('should return a message if no user is found', (done) => {
          chai.request(app)
            .get('/api/v1/search/users?search=temilaj')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body).to.have.keys(['message']);
              expect(res.body.message).to.eql('Search term does not match any user');
              done();
            });
        });
      });
      describe('get all documents belonging to a user', () => {
        it('should return all documents belonging to a user given an id', (done) => {
          chai.request(app)
            .get('/api/v1/users/1/documents')
            .set({ Authorization: regularUserToken })
            .end((err, res) => {
              expect(res.status).to.equal(200);
              expect(res.body).to.have.keys(['pagination', 'documents']);
              expect(res.body.documents[0].title).to.eql('My first document');
              expect(res.body.documents[0].content).to.eql('lorem ipsum and the rest of it');
              expect(res.body.documents[0].OwnerId).to.equal(1);
              done();
            });
        });
        it('should return a message for invalid user id', (done) => {
          chai.request(app)
            .get('/api/v1/users/jkfjdkjfld/documents')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(err.response.text).to.eql('Error. Please check the id and try again');
              done();
            });
        });
        it('should return a message for user id not in the database', (done) => {
          chai.request(app)
            .get('/api/v1/users/5/documents')
            .set({ 'Authorization': adminToken })
            .end((err, res) => {
              expect(res.status).to.equal(404);
              expect(res.body.message).to.eql('No document matches the request.');
              done();
            });
        });
      });
    });