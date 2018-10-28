
const { validationResult } = require('express-validator/check');
const userController = require('../controllers/user');
const Auth = require('../middlewares/auth');
const MyError = require('../util/error');
const loginValidator = require('../validators/login');
const registerValidator = require('../validators/register');

module.exports = (router) => {
    router
        .post('/register', registerValidator, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                if (!req.body.fullname || !req.body.email || !req.body.password) throw new MyError(400, 'Missing Informations');
                await userController.postSignup(req.body);
                res.status(201).send({ message: 'user created' });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/login', loginValidator, async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ error: { form: errors.array() } });
            }
            try {
                const authToken = await userController.login(req.body.email, req.body.password);
                res.status(200).send({ message: 'connected', token: authToken });
            } catch (e) {
                res.status(e.status).send({ error: e.message });
            }
        })
        .post('/logout', Auth.isAuthorized, (req, res) => {
            res.sendStatus(200);
        })
        .post('/forgot', (req, res) => {
            res.sendStatus(200);
        })
        .get('/profile', Auth.isAuthorized, (req, res) => {
            res.sendStatus(200);
        })
        .put('/profile', Auth.isAuthorized, (req, res) => {
            res.sendStatus(200);
        });
};
