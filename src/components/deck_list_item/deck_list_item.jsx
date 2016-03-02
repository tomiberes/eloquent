import React, {Component} from 'react';

import {router} from '../../app';

export default class DeckListItem extends Component {
  constructor(props) {
    super(props);
    this.showDeck = this.showDeck.bind(this);
  }

  showDeck() {
    let deck = this.props.deck;
    router.go('deck/' + deck.id + '/' + deck.progress);
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
