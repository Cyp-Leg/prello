const { check, oneOf } = require('express-validator/check');

const addBoard = [
    check('name')
        .not().isEmpty()
        .isString(),
    check('visibility')
        .not().isEmpty()
        .isString()
        .trim()
        .escape()
        .isIn(['public', 'private', 'team'])
];

const updateBoardLists = [
    check('lists')
        .escape()
        .custom(item => item)
        .isArray(),
];

const changeVisibility = [
    check('visibility')
        .not().isEmpty()
        .isString()
        .trim()
        .escape()
        .isIn(['public', 'private', 'team'])
];

const changeIsArchived = [
    check('isArchived')
        .not().isEmpty()
        .isBoolean()
];

const changeName = [
    check('boardName')
        .not().isEmpty()
        .isString()
        .trim()
        .isLength({ min: 1 }),
];

const addMember = oneOf([
    check('email')
        .not().isEmpty()
        .trim()
        .escape()
        .isEmail(),
    check('username')
        .not().isEmpty()
        .trim()
        .escape()
        .isString(),
]);

const changeAccess = [
    check('canEdit')
        .not().isEmpty()
        .trim()
        .escape()
        .isBoolean()
];

const createLabel = [
    check('name')
        .not().isEmpty()
        .trim()
        .isString(),
    check('color')
        .not().isEmpty()
        .trim()
        .matches('^#(?:[0-9a-fA-F]{3}){2}$')
        .isString(),
];

const changeGithubRepo = [
    check('url')
        .not().isEmpty()
        .trim()
        .isString(),
    check('name')
        .not().isEmpty()
        .trim()
        .isString(),
];

module.exports = {
    addBoard,
    addMember,
    changeAccess,
    changeGithubRepo,
    changeIsArchived,
    changeName,
    changeVisibility,
    createLabel,
    updateBoardLists,
};
