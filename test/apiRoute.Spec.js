process.env.NODE_ENV = 'test';
import models from '../server/models';
import chai from 'chai';
import chaiHttp from 'chai-http';
const Userdata = models.Userdata;
const should  = chai.should();
 chai.use(chaiHttp);

 describe('Userdata', () => {
        beforeEach((done) => {
            Userdata.destroy({}, (err) => {
                done();
            });
        });
    describe('/Post user', () => {
        it('it should create user', (done) => {
            chai.request(app)
                .post('/api/users/signup')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('Array');
                        res.body.length.should.be.eql(0);
                        done();
                    })
        })
    })
})