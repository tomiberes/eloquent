import React from 'react';
import _ from 'lodash';
import * as C from '../../constants/constants.js';
import Button from '../button/button';

class Snackbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.handleAction = this.handleAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      let duration = nextProps.duration || C.Durations.SNACKBAR_SHORT;
      this.setState({ active: true });
      setTimeout(() => { this.setState({ active: false }); }, duration);
    }
  }

  handleAction(ev) {
    ev.preventDefault();
    if (this.props.action && _.isFunction(this.props.action)) {
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

export default Snackbar;
