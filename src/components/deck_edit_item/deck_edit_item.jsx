import React from 'react';
import Router from '../../util/router';
import DeckActions from '../../actions/deck_actions';
import DeckUtils from '../../util//deck_utils';
import Button from '../button/button';
import IconEdit from '../icons/edit';
import IconDelete from '../icons/delete';

class DeckEditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editDeckEntry = this.editDeckEntry.bind(this);
    this.deleteDeckEntry = this.deleteDeckEntry.bind(this);
  }

  editDeckEntry() {
    let id = this.props.deck.id;
    let index = this.props.index;
    Router.go('deck/' + id + '/edit/' + index);
  }

  deleteDeckEntry() {
    let deck = this.props.deck;
    let index = this.props.index;
    deck.items.splice(index, 1);
    DeckActions.set(deck);
  }

  render() {
    let deck = this.props.deck;
    let index = this.props.index;
    let variantOne = deck.variants[0];
    let variantTwo = deck.variants[1];

    return (
      <li className="deck-edit-item">
        <Button className="left" triggerHandler={this.deleteDeckEntry}>
          <IconDelete />
        </Button>
        <div className="center">
          <span className="variantOne">{DeckUtils.getItemValue(deck, index, variantOne)}</span>
          <br></br>
          <span className="variantTwo">{DeckUtils.getItemValue(deck, index, variantTwo)}</span>
        </div>
        <Button className="right" triggerHandler={this.editDeckEntry}>
          <IconEdit />
        </Button>
      </li>
    );
  }
}

export default DeckEditItem;
