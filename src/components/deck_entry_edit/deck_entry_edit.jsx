import React, {Component} from 'react';

import C from '../../constants/constants';
import {router} from '../../app';
import AppActions from '../../actions/app_actions';
import DeckActions from '../../actions/deck_actions';
import AppStore from '../../stores/app_store';
import DeckStore from '../../stores/deck_store';
import DeckUtils from '../../util/deck_utils';
import TextInput from '../text_input/text_input';
import Button from '../button/button';
import IconChevronLeft from '../icons/chevron_left';
import NotFound from '../not_found/not_found';

export default class DeckEntryEdit extends Component {
  constructor(props) {
    super(props);
    this.state = this.getUpdate();
    this.update = this.update.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
  }

  componentDidMount() {
    DeckStore.addChangeListener(this.update);
    AppActions.setItems({
      [C.AppItems.TOP_BAR_LEFT]: {
        component: Button,
        props: {
          className: 'left',
          triggerHandler: this.navigateBack
        },
        children: [
          React.createElement(IconChevronLeft, {key: 'icon'}),
          'Back'
        ]
      }
    });
  }

  componentWillUnmount() {
    DeckStore.removeChangeListener(this.update);
    this.applyChanges();
  }

  update() {
    this.setState(this.getUpdate());
  }

  getUpdate() {
    let id = AppStore.get(C.Strings.args)[0];
    let index = AppStore.get(C.Strings.args)[1];
    return {
      deck: DeckStore.get(id),
      index: index
    };
  }

  applyChanges() {
    let deck = this.state.deck;
    let index = this.state.index;
    if (deck) {
      let item = deck.items[index] || {};
      item[deck.variants[0]] = this.refs.variantInputOne.getValue();
      item[deck.variants[1]] = this.refs.variantInputTwo.getValue();
      deck.items[index] = item;
      DeckActions.set(deck);
    }
  }

  navigateBack() {
    router.back();
  }

  shownChange(ev) {
    this.setState({shownValue: ev.target.value});
  }

  learnedChange(ev) {
    this.setState({learndValue: ev.target.value});
  }

  render() {
    let deck = this.state.deck;
    if (!deck) {
      return <NotFound />;
    }
    let index = this.state.index;
    let variantOne = deck.variants[0];
    let variantTwo = deck.variants[1];

    return (
      <div className="deck-entry-edit">
        <div className="line-item">
          <TextInput ref="variantInputOne" label={variantOne + ':'} value={DeckUtils.getItemValue(deck, index, variantOne)}/>
        </div>
        <div className="line-item">
          <TextInput ref="variantInputTwo" label={variantTwo + ':'} value={DeckUtils.getItemValue(deck, index, variantTwo)}/>
        </div>
      </div>
    );
  }
}
