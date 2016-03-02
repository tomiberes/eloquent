import C from '../constants/constants';
import Dispatcher from '../dispatcher/dispatcher';
import DeckLocalService from '../data/local/deck_local_service';

// TODO
function makeIdbErrorMessage(err) {
  return err.message;
}

const DeckActions = {
  get(id) {
    DeckLocalService.get(id);
  },

  getIdbSuccess(deck) {
    Dispatcher.dispatch({
      type: C.DeckActions.GET_SUCCESS,
      payload: deck
    });
  },

  set(deck) {
    Dispatcher.dispatch({
      type: C.DeckActions.SET,
      payload: deck
    });
    DeckLocalService.set(deck);
  },

  setIdbSuccess(deck) {
    Dispatcher.dispatch({
      type: C.DeckActions.SET_SUCCESS,
      payload: deck
    });
  },

  destroy(id) {
    Dispatcher.dispatch({
      type: C.DeckActions.DESTROY,
      payload: id
    });
    DeckLocalService.destroy(id);
  },

  // TODO return destroyed deck
  destroyIdbSuccess() {
    Dispatcher.dispatch({
      type: C.DeckActions.DESTROY_SUCCESS,
      payload: null
    });
  },

  getAll() {
    Dispatcher.dispatch({
      type: C.DeckActions.GET_ALL,
      payload: null
    });
    DeckLocalService.getAll();
  },

  getAllIdbSuccess(decks) {
    Dispatcher.dispatch({
      type: C.DeckActions.GET_ALL_IDB_SUCCESS,
      payload: decks
    });
  },

  // Generic error handler
  idbError(err) {
    Dispatcher.dispatch({
      type: C.AppActions.SHOW_SNACKBAR,
      payload: {message: makeIdbErrorMessage(err)}
    });
  }
};

export default DeckActions;
