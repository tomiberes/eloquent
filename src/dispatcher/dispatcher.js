import Flux from 'flux';
import Constants from '../constants/constants';

let Dispatcher = Object.assign(Flux.Dispatcher.prototype, {

  // Using either #handleViewAction or #handleServerAction is optional,
  // it is used to provide additional event flow information.
  // Otherwise just use Dispatcher#dispatch directly from Action.

  handleViewAction(action) {
    var payload = {
      source: Constants.PayloadSources.VIEW_ACTION,
      action: action
    };
    this.dispatch(payload);
  },

  handleServerAction(action) {
    var payload = {
      source: Constants.PayloadSources.SERVER_ACTION,
      action: action
    };
    this.dispatch(payload);
  }
});

// let dispatcher = new Dispatcher();
let dispatcher = new Flux.Dispatcher();

export default dispatcher;
