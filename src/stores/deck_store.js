import EventEmitter from 'eventemitter3';
import C from '../constants/constants';
import Dispatcher from '../dispatcher/dispatcher';

let _decks = [];

function set(deck) {
  _decks[deck.id] = deck;
}

function setAll(decks) {
  _decks = decks;
}

function destroy(id) {
  delete _decks[id];
}

function destroyAll() {
  _decks = {};
}

let DeckStore = Object.assign({}, EventEmitter.prototype, {
  get(id) {
    return _decks[id];
  },

  getAll() {
    return _decks;
  },

  emitChange() {
    return this.emit(C.Strings.change);
  },

  addChangeListener(cb) {
    this.on(C.Strings.change, cb);
  },

  removeChangeListener(cb) {
    this.removeListener(C.Strings.change, cb);
  }
});

DeckStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case C.DeckActions.GET_IDB_SUCCESS:
      set(action.payload);
      DeckStore.emitChange();
      break;
    case C.DeckActions.SET:
      set(action.payload);
      DeckStore.emitChange();
      break;
    case C.DeckActions.SET_IDB_SUCCESS:
      set(action.payload);
      DeckStore.emitChange();
      break;
    case C.DeckActions.DESTROY:
      destroy(action.payload);
      DeckStore.emitChange();
      break;
    case C.DeckActions.DESTROY_IDB_SUCCESS:
      destroy(action.payload);
      DeckStore.emitChange();
      break;
    case C.DeckActions.GET_ALL:
      destroyAll();
      DeckStore.emitChange();
      break;
    case C.DeckActions.GET_ALL_IDB_SUCCESS:
      setAll(action.payload);
      DeckStore.emitChange();
      break;
    default:
      break;
  }
});

export default DeckStore;
