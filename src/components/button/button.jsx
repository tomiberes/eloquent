import React, {Component} from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let className = 'button';

    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    return (
      <button type="button" className={className} onClick={this.props.triggerHandler}>
        {this.props.children}
      </button>
    );
  }
}
