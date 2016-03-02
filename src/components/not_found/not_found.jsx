import React, {Component} from 'react';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="not-found">
        {this.props.children}
      </div>
    );
  }
}
