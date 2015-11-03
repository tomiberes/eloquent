import React from 'react';

class Button extends React.Component {
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

export default Button;
