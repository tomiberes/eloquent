import EventEmitter from 'eventemitter3';
import * as C from '../constants/constants';
import Dispatcher from '../dispatcher/dispatcher';

let _state = {
  [C.Strings.args]: null,
  [C.Strings.items]: null,
  [C.Strings.snackbar]: null
};

function set(key, value) {
  _state[key] = value;
}

let AppStore = Object.assign({}, EventEmitter.prototype, {
  get(key) {
    return _state[key];
  },

  getAll() {
    return _state;
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

AppStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case C.AppActions.URL_CHANGE:
      set(C.Strings.args, action.payload);
      // Reset upon navigation
      set(C.Strings.items, null);
      set(C.Strings.snackbar, null);
      AppStore.emitChange();
      break;
    case C.AppActions.SET_ITEMS:
      set(C.Strings.items, action.payload);
      AppStore.emitChange();
      break;
    case C.AppActions.SHOW_SNACKBAR:
      set(C.Strings.snackbar, action.payload);
      AppStore.emitChange();
      break;
    default:
      break;
  }
});

export default AppStore;
