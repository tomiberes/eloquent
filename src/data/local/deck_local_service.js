import { db, STORES } from './idb';
import DeckActions from '../../actions/deck_actions';

const DeckLocalService = {
  get(id) {
    db.open((err) => {
      if (err) DeckActions.idbError(err);
      db.get(STORES.DECKS, id, (err, data) => {
        if (err) DeckActions.idbError(err);
        DeckActions.getIdbSuccess(data);
      });
    });
  },

  set(deck) {
    db.open((err) => {
      if (err) DeckActions.idbError(err);
      db.put(STORES.DECKS, deck, (err, data) => {
        if (err) DeckActions.idbError(err);
        DeckActions.setIdbSuccess(data);
      });
    });
  },

  destroy(id) {
    db.open((err) => {
      if (err) DeckActions.idbError(err);
      db.delete(STORES.DECKS, id, (err, data) => {
        if (err) DeckActions.idbError(err);
        DeckActions.destroyIdbSuccess(data);
      });
    });
  },

  getAll() {
    db.open((err) => {
      if (err) DeckActions.idbError(err);
      db.query(STORES.DECKS, {}, (err, data) => {
        if (err) DeckActions.idbError(err);
        // Convert from Array to Object
        DeckActions.getAllIdbSuccess(data.reduce((obj, deck) => {
          obj[deck.id] = deck;
          return obj;
        }, {}));
      });
    });
  }
};

export default DeckLocalService;
