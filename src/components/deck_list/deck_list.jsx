import React from 'react';
import * as C from '../../constants/constants';
import Router from '../../util/router';
import AppActions from '../../actions/app_actions';
import DeckStore from '../../stores/deck_store';
import DeckListItem from '../deck_list_item/deck_list_item';
import Button from '../button/button';

class DeckList extends React.Component {
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
    Router.go('settings');
  }

  navigateDeckListEdit() {
    Router.go('decks/edit');
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

export default DeckList;
