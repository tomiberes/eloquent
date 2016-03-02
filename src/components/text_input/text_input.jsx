import React, {Component} from 'react';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    let value = this.props.value || '';
    this.state = {
      value: value,
      focused: false
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  focus() {
    React.findDOMNode(this.refs.in).focus();
  }

  getValue() {
    return this.state.value;
  }

  setValue(value) {
    this.state.value = value;
  }

  handleFocus(ev) {
    this.setState({focused: true});
  }

  handleBlur(ev) {
    this.setState({focused: false});
  }

  handleInput(ev) {
    this.setState({value: ev.target.value});
  }

  render() {
    let className = 'text-input';
    let label = this.props.label;
    let value = this.state.value;

    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    if (this.state.focused || value.length > 0) {
      className += ' selected';
    }

    return (
      <form className={className}>
        <input type="text" ref="in" value={value} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleInput}/>
        {label ? <label><span>{label}</span></label> : false}
      </form>
    );
  }
}
