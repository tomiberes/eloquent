import keyMirror from 'keymirror';

const Constants = {
  Strings: keyMirror({
    change: null,
    args: null,
    items: null,
    snackbar: null
  }),

  Durations: {
    SNACKBAR_SHORT: 2000,
    SNACKBAR_LONG: 4000
  },

  AppItems: keyMirror({
    TOP_BAR_LEFT: null,
    TOP_BAR_CENTER: null,
    TOP_BAR_RIGHT: null
  }),

  AppActions: keyMirror({
    URL_CHANGE: null,
    SET_ITEMS: null,
    SHOW_SNACKBAR: null
  }),

  DeckActions: keyMirror({
    GET_IDB_SUCCESS: null,
    SET: null,
    SET_IDB_SUCCESS: null,
    DESTROY: null,
    DESTROY_IDB_SUCCESS: null,
    GET_ALL: null,
    GET_ALL_IDB_SUCCESS: null
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    SERVER_ACTION: null
  })
};

export default Constants;
