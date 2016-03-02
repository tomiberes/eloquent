import React, {Component} from 'react';

import SVG from '../svg/svg';

export default class IconDone extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SVG className="svg-icon icon-done">
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
      </SVG>
    );
  }
}
