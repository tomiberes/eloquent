import React, {Component} from 'react';

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
    let topBarItems = [];
    if (this.state[C.Strings.items]) {
      let items = [];
      // This component can contain the following items:
      items.push(this.state[C.Strings.items][C.AppItems.TOP_BAR_LEFT]);
      items.push(this.state[C.Strings.items][C.AppItems.TOP_BAR_CENTER]);
      items.push(this.state[C.Strings.items][C.AppItems.TOP_BAR_RIGHT]);
      topBarItems = items.map((item) => {
        if (item) {
          return React.createElement(item.component, item.props, item.children);
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
