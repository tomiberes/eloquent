import React from 'react';
import Router from '../../util/router';
import DeckActions from '../../actions/deck_actions';
import Button from '../button/button';
import IconEdit from '../icons/edit';
import IconDelete from '../icons/delete';

class DeckListEditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.editDeck = this.editDeck.bind(this);
    this.deleteDeck = this.deleteDeck.bind(this);
  }

  editDeck() {
    let id = this.props.deck.id;
    Router.go('deck/' + id + '/edit');
  }

  deleteDeck() {
    let id = this.props.deck.id;
    DeckActions.destroy(id);
  }

  render() {
    let deck = this.props.deck;

    return (
      <li className="deck-list-edit-item">
        <Button className="left" triggerHandler={this.deleteDeck}>
          <IconDelete />
        </Button>
        <div className="center">
          <span className="name">
            {deck.name}
          </span>
          <br></br>
          <span className="description">
            {deck.desc}
          </span>
        </div>
        <Button className="right" triggerHandler={this.editDeck}>
          <IconEdit />
        </Button>
      </li>
    );
  }
}

export default DeckListEditItem;
