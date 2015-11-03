import Batoh from 'batoh';

export const STORES = {
  DECKS: 'decks'
};

let version = 1;

function setup(version) {
  return {
    database: 'decks',
    version: version,
    stores: {
      [STORES.DECKS]: {
        keyPath: 'id',
        autoIncrement: false,
        indexes: [
          {
            name: 'name',
            keyPath: 'name',
            unique: false
          }
        ]
      }
    }
  };
}

export let db = new Batoh.Database(setup(version));
