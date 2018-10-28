const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app.js');
const User = require('../../models/User');
require('../../database');

app.set('NODE_ENV', 'test');

const data = {
    fullname: 'nameTest',
    email: 'test@test.fr',
    password: 'passTest'
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
        data.email = '';
        request(app)
            .post('/register')
            .send(data)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
});
describe('POST /login', () => {
    const data = {
        name: 'nameTest',
        nickname: 'nicknameTest',
        email: 'test@test.fr',
        password: 'passTest'
    };
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
