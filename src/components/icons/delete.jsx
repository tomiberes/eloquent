import React, {Component} from 'react';

import SVG from '../svg/svg';

export default class IconDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SVG className="svg-icon icon-delete">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
      </SVG>
    );
  }
}
