const request = require('supertest');
const app = require('../../app.js');
const Board = require('../../models/Board');
const Card = require('../../models/Card');
const User = require('../../models/User');
const List = require('../../models/List');
const boardController = require('../../controllers/boards');
const cardController = require('../../controllers/cards');
const userController = require('../../controllers/users');
const listController = require('../../controllers/lists');

const cardData = {
    name: 'test',
};
const listData = {
    name: 'test',
    id: ''
};
const userData = {
    userMember: {
        fullName: 'nameTest',
        email: 'test@test.fr',
        password: 'passTest',
        username: 'username',
        biography: 'biography'
    },
    userNotMember: {
        fullName: 'nameTest',
        email: 'test2@test.fr',
        password: 'passTest',
        username: 'username2',
        biography: 'biography'
    }
};
let userMember;
let userNotMember;
let tokenMember;
let tokenNotMember;
describe('POST /lists/:id/cards', () => {
    before((done) => {
        Promise.all([Card.deleteMany({}), Board.deleteMany({}), User.deleteMany({}), List.deleteMany({})]).then(async () => {
            try {
                userMember = await userController.signUp(userData.userMember);
                userNotMember = await userController.signUp(userData.userNotMember);
                tokenMember = (await userController.login(userData.userMember.email,
                    userData.userMember.password)).token;
                tokenNotMember = (await userController.login(userData.userNotMember.email,
                    userData.userNotMember.password)).token;
                const board = await boardController.postBoard(userMember._id, { name: 'Test board', visibility: 'public' });
                const list = await listController.createList(board._id, listData.name);
                listData.id = list._id;
                done();
            } catch (e) {
                console.log('Error happened : ', e);
                process.exit(-1);
            }
        });
    });

    it('should return 401 ERROR', (done) => {
        request(app)
            .post(`/lists/${listData.id}/cards`)
            .send(cardData)
            .expect('Content-Type', /json/)
            .expect(401, done);
    });
    it('should return 403 ERROR', (done) => {
        request(app)
            .post(`/lists/${listData.id}/cards`)
            .send(cardData)
            .set('Authorization', `Bearer ${tokenNotMember}`)
            .expect('Content-Type', /json/)
            .expect(403, done);
    });
    it('should return 422 ERROR', (done) => {
        const wrongCard = {
            name: ''
        };
        request(app)
            .post(`/lists/${listData.id}/cards`)
            .send(wrongCard)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .post('/lists/unknown/cards')
            .send(cardData)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 201 OK', (done) => {
        request(app)
            .post(`/lists/${listData.id}/cards`)
            .send(cardData)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});

let list1 = {
    name: 'List 1',
};
let list2 = {
    name: 'List 2',
};
let card1 = {
    name: 'card1'
};

describe('PUT /lists/:listId/cards/:cardId', () => {
    before((done) => {
        Promise.all([]).then(async () => {
            try {
                const board = await boardController.postBoard(userMember._id, { name: 'testBoard', visibility: 'public' });
                list1 = await listController.createList(board._id, list1.name);
                list2 = await listController.createList(board._id, list2.name);
                card1.list = list1._id;
                card1 = await cardController.createCard(card1.name, card1.list);
                done();
            } catch (e) {
                console.log('Error happened : ', e);
                process.exit(-1);
            }
        });
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .put(`/lists/${list1._id}/cards/invalidCardId`)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 422 ERROR if no body provided', (done) => {
        request(app)
            .put(`/lists/${list1._id}/cards/${card1._id}`)
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('should return 404 ERROR if card not found', (done) => {
        request(app)
            .put(`/lists/${list1._id}/cards/123456789abc`)
            .set('Authorization', `Bearer ${tokenMember}`)
            .send({ sourceListId: list2._id, index: 0 })
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('should return 200 OK', (done) => {
        request(app)
            .put(`/lists/${list1._id}/cards/${card1._id}`)
            .set('Authorization', `Bearer ${tokenMember}`)
            .send({ sourceListId: list2._id, index: 0 })
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('PUT /lists/:listId/isArchived', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .put(`/lists/${listData.id}/isArchived`)
            .send({ isArchived: true })
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(204, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .put(`/lists/${listData.id}/isArchived`)
            .send({ isArchived: 'incorrect value' })
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .put('/cards/123456/isArchived/')
            .send({ isArchived: true })
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(404, done);
    });
});

describe('PUT /lists/:listId/name', () => {
    it('should return 200 OK', (done) => {
        request(app)
            .put(`/lists/${listData.id}/name`)
            .send({ name: 'a new list name' })
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(204, done);
    });
    it('should return 422 ERROR', (done) => {
        request(app)
            .put(`/lists/${listData.id}/name`)
            .send({ name: ' ' })
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(422, done);
    });
    it('should return 404 ERROR', (done) => {
        request(app)
            .put('/cards/123456/name/')
            .send({ name: 'new list name' })
            .set('Authorization', `Bearer ${tokenMember}`)
            .expect(404, done);
    });
});

