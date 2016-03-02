import React, {Component} from 'react';
import isFunction from 'lodash/isFunction';

import C from '../../constants/constants';
import AppActions from '../../actions/app_actions';
import Button from '../button/button';

export default class Snackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.handleAction = this.handleAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      let duration = nextProps.duration || C.Durations.SNACKBAR_SHORT;
      clearTimeout(this.state.timeout);
      this.setState({active: true});
      this.state.timeout = setTimeout(() => {
        this.setState({active: false});
        AppActions.showSnackbar(null); // Clear self
      }, duration);
    }
  }

  handleAction(ev) {
    ev.preventDefault();
    if (this.props.action && isFunction(this.props.action)) {
      this.props.action();
    }
  }

  render() {
    let className = 'snackbar';
    let message = this.props.message;
    let action = this.props.action ? <Button triggerHandler={this.handleAction}></Button> : null;

    if (this.state.active) {
      className += ' open';
    } else {
      message = null;
    }

    return (
      <div className={className}>
        <span>{message}</span>
        {action}
      </div>
    );
  }
}
