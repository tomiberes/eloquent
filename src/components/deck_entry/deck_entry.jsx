import React from 'react';
import _ from 'lodash';
import C from '../../constants/constants';
import Router from '../../util/router';
import AppActions from '../../actions/app_actions';
import DeckActions from '../../actions/deck_actions';
import AppStore from '../../stores/app_store';
import DeckStore from '../../stores/deck_store';
import DeckUtils from '../../util//deck_utils';
import TextInput from '../text_input/text_input';
import Button from '../button/button';
import IconChevronLeft from '../icons/chevron_left';
import IconDone from '../icons/done';
import NotFound from '../not_found/not_found';

class DeckEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getUpdate();
    this.update = this.update.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
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
    let id = AppStore.get(C.Strings.args)[0];
    return {
      deck: DeckStore.get(id)
    };
  }

  checkAnswer() {
    let deck = this.state.deck;
    let answer = this.refs.answerInput.getValue().toLowerCase();
    let progress = AppStore.get(C.Strings.args)[1];
    let valid = DeckUtils.getItemValue(deck, progress, deck.variants[1]);
    if (valid) valid = valid.toLowerCase();
    if (_.isEqual(answer, valid)) {
      this.refs.answerInput.setValue('');
      AppActions.showSnackbar({ message: 'Good Job!', action: null });
      if (progress < deck.items.length) {
        deck.progress++;
        DeckActions.set(deck);
        if (deck.progress === deck.items.length) {
          Router.go('decks');
        } else {
          Router.go('deck/' + deck.id + '/' + deck.progress);
        }
      }
    } else {
      AppActions.showSnackbar({ message: 'Wrong answer!', action: null });
    }
  }

  navigateBack() {
    Router.go('decks');
  }

  navigateEditDeck() {
    let deck = this.state.deck;
    let id = deck.id;
    Router.go('deck/' + id + '/edit');
  }

  render() {
    let deck = this.state.deck;
    if (!deck) {
      return <NotFound />;
    }
    let index = deck.progress;
    let variantOne = deck.variants[0];
    let variantTwo = deck.variants[1];

    return (
      <div className="deck-entry">
        <div className="line-item">
          <span>{DeckUtils.getItemValue(deck, index, variantOne)}</span>
        </div>
        <div className="line-item">
          <TextInput ref="answerInput" label={'In ' + variantTwo + ':'}/>
        </div>
        <div className="line-item action-confirm">
          <Button triggerHandler={this.checkAnswer}>
            <IconDone />
          </Button>
        </div>
      </div>
    );
  }
}

export default DeckEntry;
