import React from 'react';
import Router from '../../util/router';

class DeckListItem extends React.Component {
  constructor(props) {
    super(props);
    this.showDeck = this.showDeck.bind(this);
  }

  showDeck() {
    let deck = this.props.deck;
    Router.go('deck/' + deck.id + '/' + deck.progress);
  }

  render() {
    let deck = this.props.deck;

    return (
      <li className="deck-list-item" onClick={this.showDeck}>
        <span className="name">
          {deck.name}
        </span>
        <br></br>
        <span className="description">
          {deck.desc}
        </span>
      </li>
    );
  }
}

export default DeckListItem;
