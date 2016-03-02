import React, {Component} from 'react';

import SVG from '../svg/svg';

export default class IconArrowForward extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SVG className="svg-icon icon-arrow-forward">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </SVG>
    );
  }
}
