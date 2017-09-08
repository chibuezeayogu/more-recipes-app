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