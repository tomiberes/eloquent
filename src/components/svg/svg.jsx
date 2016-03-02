import React, {Component} from 'react';

const NS = 'http://www.w3.org/2000/svg';

export default class SVG extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let width = this.props.width || SVG.ICON_SIZE;
    let height = this.props.height || SVG.ICON_SIZE;

    return (
      <svg className={this.props.className} version="1.1" xmlns={NS}
        x="0px" y="0px" width={width + 'px'} height={height + 'px'}
        viewBox={'0 0 ' + width + ' ' + height}>
        {this.props.children}
      </svg>
    );
  }
}

SVG.ICON_SIZE = 24;
