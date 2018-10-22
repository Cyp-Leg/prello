import { initialState } from './modal';
import modalReducer from './modal';
import * as actions from '../actions/modal';

describe('modal reducer', () => {
  it('should return the initial state', () => {
    // Specify empty state
    expect(modalReducer({}, {})).toEqual({});
    // Initial state
    expect(modalReducer(undefined, {})).toEqual(initialState);
  });
});

describe('modal/DISPLAY_LOADING_MODAL', () => {
  it('should set isModalOpen to true', () => {
    const action = actions.displayLoadingModalAction();
    const finalState = modalReducer(undefined, action);
    expect(finalState.isModalOpen).toEqual(true);
  });
});

describe('modal/HIDE_LOADING_MODAL', () => {
  it('should set isModalOpen to false', () => {
    const action = actions.hideLoadingModalAction();
    const finalState = modalReducer(undefined, action);
    expect(finalState.isModalOpen).toEqual(false);
  });
});