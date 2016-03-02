import React, {Component} from 'react';

import C from '../../constants/constants';
import {router} from '../../app';
import AppActions from '../../actions/app_actions';
import DeckStore from '../../stores/deck_store';
import DeckListItem from '../deck_list_item/deck_list_item';
import Button from '../button/button';

export default class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = this.getUpdate();
    this.update = this.update.bind(this);
    this.navigateSettings = this.navigateSettings.bind(this);
    this.navigateDeckListEdit = this.navigateDeckListEdit.bind(this);
  }

  componentDidMount() {
    DeckStore.addChangeListener(this.update);
    AppActions.setItems({
      [C.AppItems.TOP_BAR_LEFT]: {
        component: Button,
        props: {
          className: 'left',
          triggerHandler: null
        },
        children: [
          'About'
        ]
      },
      [C.AppItems.TOP_BAR_RIGHT]: {
        component: Button,
        props: {
          className: 'right',
          triggerHandler: this.navigateDeckListEdit
        },
        children: [
          'Edit'
        ]
      }
    });
  }

  componentWillUnmount() {
    DeckStore.removeChangeListener(this.update);
  }

  update() {
    this.setState(this.getUpdate());
  }

  getUpdate() {
    return {
      decks: DeckStore.getAll()
    };
  }

  navigateSettings() {
    router.go('settings');
  }

  navigateDeckListEdit() {
    router.go('decks/edit');
  }

  render() {
    let decks = this.state.decks;
    let deckListItems = Object.keys(decks).map((key) => {
      let deck = decks[key];
      return React.createElement(DeckListItem, {
        deck: deck,
        key: deck.id
      });
    });

    return (
      <div className="deck-list">
        <ul>
          {deckListItems}
        </ul>
      </div>
    );
  }
}
