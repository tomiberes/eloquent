import React from 'react';
import * as C from '../../constants/constants';
import Router from '../../util/router';
import AppActions from '../../actions/app_actions';
import DeckActions from '../../actions/deck_actions';
import AppStore from '../../stores/app_store';
import DeckStore from '../../stores/deck_store';
import DeckEditItem from '../deck_edit_item/deck_edit_item';
import TextInput from '../text_input/text_input';
import Button from '../button/button';
import IconChevronLeft from '../icons/chevron_left';
import IconAdd from '../icons/add';
import NotFound from '../not_found/not_found';

class DeckEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getUpdate();
    this.update = this.update.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.addDeckEntry = this.addDeckEntry.bind(this);
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
    this.applyChanges();
  }

  update() {
    this.setState(this.getUpdate());
  }

  getUpdate() {
    let id = AppStore.get(C.Strings.args)[0];
    return {
      deck: DeckStore.get(id)
    };
  }

  addDeckEntry() {
    let deck = this.state.deck;
    let id = deck.id;
    let l = deck.items.length;
    let index = l > 0 ? l : 0;
    Router.go('deck/' + id + '/edit/' + index);
  }

  applyChanges() {
    let deck = this.state.deck;
    if (deck) {
      deck.name = this.refs.nameInput.getValue();
      deck.desc = this.refs.descInput.getValue();
      deck.variants[0] = this.refs.variantInputOne.getValue();
      deck.variants[1] = this.refs.variantInputTwo.getValue();
      DeckActions.set(deck);
    }
  }

  navigateBack() {
    Router.back();
  }

  render() {
    let deck = this.state.deck;
    if (!deck) {
      return <NotFound />;
    }
    let nameLabel = 'Name:';
    let descLabel = 'Description:';
    let variantLabelOne = 'First Variant:';
    let variantLabelTwo = 'Second Variant:';

    let deckEditItems = deck.items.map((item, i) => {
      return React.createElement(DeckEditItem, {
        deck: deck,
        index: i,
        key: i
      });
    });

    return (
      <div className="deck-edit">
        <div className="line-item">
          <TextInput ref="nameInput" label={nameLabel} value={deck.name}/>
        </div>
        <div className="line-item">
          <TextInput ref="descInput" label={descLabel} value={deck.desc}/>
        </div>
        <div className="line-item">
          <TextInput ref="variantInputOne" label={variantLabelOne} value={deck.variants[0]}/>
        </div>
        <div className="line-item">
          <TextInput ref="variantInputTwo" label={variantLabelTwo} value={deck.variants[1]}/>
        </div>
        <div className="action-add">
          <Button className="button-add" triggerHandler={this.addDeckEntry}>
            <IconAdd />
          </Button>
        </div>
        <ul>
          {deckEditItems}
        </ul>
      </div>
    );
  }
}

export default DeckEdit;
