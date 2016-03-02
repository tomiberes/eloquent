import React, {Component} from 'react';
import isEqual from 'lodash/isEqual';

import C from '../../constants/constants';
import {router} from '../../app';
import AppActions from '../../actions/app_actions';
import DeckActions from '../../actions/deck_actions';
import AppStore from '../../stores/app_store';
import DeckStore from '../../stores/deck_store';
import DeckUtils from '../../util//deck_utils';
import TextInput from '../text_input/text_input';
import Button from '../button/button';
import IconArrowForward from '../icons/arrow_forward';
import IconClear from '../icons/clear';
import IconChevronLeft from '../icons/chevron_left';
import IconDone from '../icons/done';
import IconRefresh from '../icons/refresh';
import NotFound from '../not_found/not_found';

export default class DeckEntry extends Component {
  constructor(props) {
    super(props);
    this.state = this.getUpdate();
    this.update = this.update.bind(this);
    this.navigateBack = this.navigateBack.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.nextEntry = this.nextEntry.bind(this);
    this.reloadEntry = this.reloadEntry.bind(this);
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
      deck: DeckStore.get(id),
      answered: false,
      correct: false
    };
  }

  checkAnswer() {
    let deck = this.state.deck;
    let answer = this.refs.answerInput.getValue().toLowerCase();
    let progress = AppStore.get(C.Strings.args)[1];
    let valid = DeckUtils.getItemValue(deck, progress, deck.variants[1]);
    if (valid) {
      valid = valid.toLowerCase();
    }
    if (isEqual(answer, valid)) {
      this.setState({
        answered: true,
        correct: true
      });
    } else {
      this.setState({
        answered: true,
        correct: false
      });
    }
  }

  nextEntry() {
    let deck = this.state.deck;
    this.refs.answerInput.setValue('');
    if (deck.progress < deck.items.length) {
      deck.progress++;
      DeckActions.set(deck);
      if (deck.progress !== deck.items.length) {
        router.go('deck/' + deck.id + '/' + deck.progress);
      }
    }
  }

  reloadEntry() {
    this.refs.answerInput.setValue('');
    this.setState({
      answered: false,
      correct: false
    });
  }

  navigateBack() {
    router.go('decks');
  }

  navigateEditDeck() {
    let deck = this.state.deck;
    let id = deck.id;
    router.go('deck/' + id + '/edit');
  }

  render() {
    let deck = this.state.deck;
    if (!deck) {
      return <NotFound />;
    }
    let index = deck.progress;
    let variantOne = deck.variants[0];
    let variantTwo = deck.variants[1];
    let checkClassName = 'check';
    let answeredClassName = 'answered';
    let naviagationClassName = 'navigation';

    if (this.state.answered) {
      checkClassName += ' hide';
      answeredClassName += ' show';
      naviagationClassName += ' show';

      if (this.state.correct) {
        answeredClassName += ' correct';
      } else {
        answeredClassName += ' wrong';
      }
    }

    return (
      <div className="deck-entry">
        <div className="line-item">
          <span>{DeckUtils.getItemValue(deck, index, variantOne)}</span>
        </div>
        <div className="line-item">
          <TextInput ref="answerInput" label={'In ' + variantTwo + ':'}/>
        </div>
        <div className="line-item actions">
          {!this.state.correct ?
            <Button className={naviagationClassName + ' left'} triggerHandler={this.reloadEntry}>
              <IconRefresh />
            </Button>
            :
            null
          }
          <div className={answeredClassName}>
            {this.state.correct ? <IconDone /> : <IconClear />}
          </div>
          <Button className={checkClassName} triggerHandler={this.checkAnswer}>
            <span>Check</span>
          </Button>
          {((index + 1) < deck.items.length) ?
            <Button className={naviagationClassName + ' right'} triggerHandler={this.nextEntry}>
              <IconArrowForward />
            </Button>
            :
            null
          }
        </div>
      </div>
    );
  }
}

export default DeckEntry;
