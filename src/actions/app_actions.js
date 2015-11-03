import * as C from '../constants/constants';
import Dispatcher from '../dispatcher/dispatcher';

const AppActions = {
  urlChange(args) {
    Dispatcher.dispatch({
      type: C.AppActions.URL_CHANGE,
      payload: args
    });
  },

  setItems(items) {
    Dispatcher.dispatch({
      type: C.AppActions.SET_ITEMS,
      payload: items
    });
  },

  showSnackbar(opts) {
    Dispatcher.dispatch({
      type: C.AppActions.SHOW_SNACKBAR,
      payload: opts
    });
  }
};

export default AppActions;
