import { initialState } from './cards';
import cardsReducer from './cards';
import * as actions from '../actions/cards';

describe('cards/DELETE_CARD reducer', () => {
    it('should return the initial state', () => {
        // Specify empty state
        expect(cardsReducer({}, {})).toEqual({})
        // Initial state
        expect(cardsReducer(undefined, {})).toEqual(initialState)
    });

    it('should delete the card with id specified', () => {
        const deleteAction = actions.deleteCardAction(1)
        const finalState = cardsReducer(undefined, deleteAction)
        expect(finalState.cards.length).toEqual(1)
        expect(finalState.cards[0]).toBe(initialState.cards[1])
    });

    it('should set an appropriate error if id not found', () => {
        const deleteAction = actions.deleteCardAction(3)
        const finalState = cardsReducer(undefined, deleteAction)
        expect(finalState.cards.length).toEqual(2)
        expect(finalState.error.toLowerCase()).toEqual(expect.stringContaining("not found"))
    });
});

describe('cards/DELETE_CARD_WITH_DELAY_STARTED reducer', () => {
    it('should set isLoading to true', () => {
        const action = actions.deleteCardWithDelayStartedAction()
        const finalState = cardsReducer(undefined, action)
        expect(finalState.isLoading).toBe(true)
    });
});