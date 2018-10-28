const request = require('supertest');
const { expect, assert } = require('chai');

const app = require('../../app.js');
const User = require('../../models/User');

const data = {
    fullname: 'nameTest',
    email: 'test@test.fr',
    password: 'passTest',
    bio: 'bio'
};

describe('POST /register', () => {
    before(async () => {
        await User.deleteMany({});
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post('/register')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
    it('should return 409 OK', (done) => {
        request(app)
            .post('/register')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(409, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = { email: '', password: data.password, fullname: data.fullname };
        request(app)
            .post('/register')
            .send(wrongData)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
});
describe('POST /login', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: data.password })
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                expect(res.body.token).to.not.be.undefined;
                done();
            });
    });

    it('should return 422 ERROR', (done) => {
        request(app)
            .post('/login')
            .send({ email: '', password: data.password })
            .expect('Content-Type', /json/)
            .expect(422, done);
    });

    it('should return 401 ERROR', (done) => {
        request(app)
            .post('/login')
            .send({ email: 'unknown@test.fr', password: data.password })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });

    it('should return 401 ERROR', (done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: 'wrongpassword' })
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
});
describe('GET /profile', () => {
    let token = null;

    before((done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: data.password })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .get('/profile')
            .expect(403, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .get('/profile')
            .set('Authorization', `Bearer ${token}`)
            .expect(200, (err, res) => {
                assert(res.body.profile.fullname, data.fullname);
                assert(res.body.profile.bio, data.bio);
                expect(res.body.profile.initials).to.not.be.empty;
                expect(res.body.profile.username).to.not.be.empty;
                // add processing data
                data.username = res.body.profile.username;
                data.initials = res.body.profile.initials;
                done();
            });
    });
});
describe('PUT /profile', () => {
    let token = null;

    before((done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: data.password })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put('/profile')
            .send(data)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongData = data;
        wrongData.username = '';
        request(app)
            .put('/profile')
            .set('Authorization', `Bearer ${token}`)
            .send(wrongData)
            .expect(422, done);
    });
    it('should return 200 OK', (done) => {
        const newData = data;
        newData.fullname = 'test1';
        newData.username = 'test2';
        newData.initials = 'TT';

        request(app)
            .put('/profile')
            .send(newData)
            .set('Authorization', `Bearer ${token}`)
            .expect(200, done);
    });
});
describe('PUT /account', () => {
    let token = null;

    before((done) => {
        request(app)
            .post('/login')
            .send({ email: data.email, password: data.password })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .put('/account')
            .expect(403, done);
    });
    it('should return 422 OK', (done) => {
        request(app)
            .put('/account')
            .set('Authorization', `Bearer ${token}`)
            .send({ email: '', password: data.password })
            .expect(422, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .put('/account')
            .set('Authorization', `Bearer ${token}`)
            .send({ email: 'test1@test.fr', password: data.password })
            .expect(200, done);
    });
});
