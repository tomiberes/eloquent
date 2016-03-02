import React, {Component} from 'react';

import SVG from '../svg/svg';

export default class IconAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SVG className="svg-icon icon-add">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </SVG>
    );
  }
}
