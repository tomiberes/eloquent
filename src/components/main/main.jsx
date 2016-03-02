import React, {Component} from 'react';

import C from '../../constants/constants';
import AppStore from '../../stores/app_store';
import Snackbar from '../snackbar/snackbar';

export default class Main extends Component {
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
      [C.Strings.snackbar]: AppStore.get(C.Strings.snackbar)
    };
  }

  render() {
    return (
      <div id="main">
        {this.props.topbar}
        {this.props.section}
        <Snackbar {...this.state.snackbar} />
      </div>
    );
  }
}
