import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import C from '../../constants/constants';
import AppStore from '../../stores/app_store';
import Snackbar from '../snackbar/snackbar';

class Main extends React.Component {
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

export default Main;
