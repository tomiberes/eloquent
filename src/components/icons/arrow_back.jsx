import React from 'react';
import SVG from '../svg/svg';

class IconArrowBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SVG className="svg-icon icon-add">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </SVG>
    );
  }
}

export default IconArrowBack;
