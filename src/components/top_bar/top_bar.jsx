import React, {Component} from 'react';
import merge from 'lodash/merge';

import C from '../../constants/constants';
import AppStore from '../../stores/app_store';

export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = this.getUpdate();
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    AppStore.addChangeListener(this.update);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this.update);
  }

  update() {
    this.setState(this.getUpdate());
  }

  getUpdate() {
    return {
      [C.Strings.items]: AppStore.get(C.Strings.items)
    };
  }

  render() {
    let topBarItems = null;
    if (this.state[C.Strings.items]) {
      let items = [];
      // This component can contain the following items:
      items.push(this.state[C.Strings.items][C.AppItems.TOP_BAR_LEFT]);
      items.push(this.state[C.Strings.items][C.AppItems.TOP_BAR_CENTER]);
      items.push(this.state[C.Strings.items][C.AppItems.TOP_BAR_RIGHT]);
      topBarItems = items.map((item, index) => {
        if (item) {
          return React.createElement(item.component,
            merge(item.props, {key: `top-bar-item-${index}`}), item.children);
        }
      });
    }

    return (
      <div className="top-bar">
        {topBarItems}
      </div>
    );
  }
}
