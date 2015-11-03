import React from 'react';
import * as C from '../../constants/constants';
import Router from '../../util/router';
import AppActions from '../../actions/app_actions';
import DeckActions from '../../actions/deck_actions';
import DeckStore from '../../stores/deck_store';
import DeckUtils from '../../util/deck_utils';
import DeckEditListItem from '../deck_list_edit_item/deck_list_edit_item';
import Button from '../button/button';
import IconChevronLeft from '../icons/chevron_left';
import IconAdd from '../icons/add';

class DeckListEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getUpdate();
    this.update = this.update.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.addDeck = this.addDeck.bind(this);
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
          React.createElement(IconChevronLeft),
          'Back'
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

  navigateBack() {
    Router.back();
  }

  addDeck() {
    let deck = DeckUtils.make();
    let id = deck.id;
    DeckActions.set(deck);
    Router.go('deck/' + id + '/edit');
  }

  render() {
    let decks = this.state.decks;
    let deckEditListItems = Object.keys(decks).map((key) => {
      let deck = decks[key];
      return React.createElement(DeckEditListItem, {
        deck: deck,
        key: deck.id
      });
    });

    return (
      <div className="deck-list-edit">
        <div className="action-add">
          <Button className="button-add" triggerHandler={this.addDeck}>
            <IconAdd />
          </Button>
        </div>
        <ul>
          {deckEditListItems}
        </ul>
      </div>
    );
  }
}

export default DeckListEdit;
