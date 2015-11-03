import uuid from 'uuid';

const DeckUtils = {
  make(name = '', desc = '', variants = [], items = []) {
    return {
      id: uuid.v4(),
      name: name,
      desc: desc,
      progress: 0,
      variants: variants,
      items: items
    };
  },

  getItemValue(deck, index, key) {
    try {
      return deck.items[index][key];
    } catch (err) {
      return null;
    }
  }
};

export default DeckUtils;
