const socket = require('../socket');
const MyError = require('../util/error');

const List = require('../models/List');

const boardController = require('../controllers/boards');
const cardController = require('../controllers/cards');


// ======================== //
// ==== Get functions ===== //
// ======================== //


/**
 * DELETE
 */
listController.removeCard = async (data) => {
    try {
        const list = await List.findById(data.listId);
        list.cards.splice(list.cards.findIndex(card => card._id === data.cardId), 1);
        await list.save();

        socket.updateClientsOnBoard(list.boardId);
        return list;
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * PUT
 */
listController.addCard = async (data) => {
    try {
        const list = await List.findById(data.listId);
        if (!list) throw new MyError(404, 'List not found');

        if (list.cards !== null) list.cards.splice(data.index, 0, data.cardId);
        else list.cards = [data.cardId];
        await list.save();

        socket.updateClientsOnBoard(list.boardId);

        return list;
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        if (err.name === 'CastError') {
            throw new MyError(404, 'List not found');
        }
        if (err.status) {
            throw err;
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * POST /lists
 */
// ======================== //
// ==== Post functions ==== //
// ======================== //
exports.postCard = async (listId, name) => {
    try {
        const list = await List.findById(listId).select('cards');
        if (!list) throw new MyError(404, 'List not found');

        const newCard = await cardController.createCard(name, listId);
        const newList = await List.findOneAndUpdate({ _id: listId }, { $addToSet: { cards: newCard._id } }, { new: true });

        socket.updateClientsOnBoard(newList.board);
        return newList;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'List not found');
        } else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

/**
 * Add card to the list
 */
exports.addCard = async (listId, cardId) => {
    try {
        const list = List.findById(listId).select('cards');
        if (!list) throw new MyError(404, 'List not found');
        const newList = await List.updateOne({ _id: listId }, { $addToSet: { cards: cardId } }, { new: true });
        return newList;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(404, 'List not found');
        } else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

exports.createList = async (boardId, name) => {
    try {
        const list = new List();
        list.name = name;
        list.board = boardId;
        const newList = await list.save();
        return newList;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'ValidationError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};

exports.getList = async (listId) => {
    try {
        const list = await List.findById(listId);
        if (!list) throw new MyError(404, 'List not found');
        return list;
    } catch (err) {
        if (err.status) throw err;
        else if (err.name === 'CastError') {
            throw new MyError(422, 'Incorrect query');
        }
        throw new MyError(500, 'Internal server error');
    }
};
