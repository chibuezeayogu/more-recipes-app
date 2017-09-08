process.env.NODE_ENV = 'test';
import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

const should  = chai.should();
 chai.use(chaiHttp);

 describe('GET: /api/v1', () => {
    it('Should return status code 404 when user accesses non-existent route', (done) => {
        chai.request(app)
            .get('/api')
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.body).to.eql({
                    message: 'Invalid Url'
                });
                done();
            });
    });


    describe('User Model', () => {
        describe('Create a new User', () => {
          it('should create a user', (done) => {
            models.User.create(fakeAudax)
              .then((user) => {
                expect(user.dataValues.fullName).to.equal(fakeAudax.fullName);
                dummyId = user.dataValues.id;
                done();
              });
          });
          it('should return a message for an empty name field', (done) => {
            fakeAudax.fullName = '';
            models.User.create(fakeAudax)
              .then()
              .catch((err) => {
                expect(err.errors[0].message).to.eql('Name field cannot be empty.');
                done();
              });
          });
        });
        describe('Update User', () => {
          it('should update a user', (done) => {
            models.User.findById(dummyId)
              .then((user) => {
                user.update({ email: 'audax@test.com', password: 'audaxes' })
                  .then((updatedUser) => {
                    expect(updatedUser.dataValues.id).to.equal(dummyId);
                    expect(user.dataValues.email).to.equal('audax@test.com');
                    done();
                  });
              });
          });
        });
      });