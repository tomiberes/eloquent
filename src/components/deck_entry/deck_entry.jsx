import React from 'react';
import * as C from '../../constants/constants';
import Router from '../../util/router';
import AppActions from '../../actions/app_actions';
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

  navigateBack() {
    Router.back();
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
          <TextInput label={'In ' + variantTwo + ':'}/>
        </div>
        <div className="line-item action-confirm">
          <Button>
            <IconDone />
          </Button>
        </div>
      </div>
    );
  }
}

export default DeckEntry;
