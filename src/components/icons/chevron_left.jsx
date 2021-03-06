import React, {Component} from 'react';

import SVG from '../svg/svg';

export default class ChevronLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SVG className="svg-icon icon-chevron-left">
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </SVG>
    );
  }
}
