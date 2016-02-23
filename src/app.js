'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from './util/router';
import AppActions from './actions/app_actions';
import DeckActions from './actions/deck_actions';
import Main from './components/main/main';
import TopBar from './components/top_bar/top_bar';
import DeckEntry from './components/deck_entry/deck_entry';
import DeckEntryEdit from './components/deck_entry_edit/deck_entry_edit';
import DeckEdit from './components/deck_edit/deck_edit';
import DeckList from './components/deck_list/deck_list';
import DeckListEdit from './components/deck_list_edit/deck_list_edit';

window.React = React; // export for http://fb.me/react-devtools

// TODO: change router imports, to `import { router } from '../../app'`
// export const router = new Router();

function navigate(args, components) {
  AppActions.urlChange(args);
  ReactDOM.render(<Main {...components} />, document.body);
}

DeckActions.getAll();

Router.on('deck/:id/edit/', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckEdit />
  });
});

Router.on('deck/:id/edit/:index', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckEntryEdit />
  });
});

Router.on('deck/:id/:index', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckEntry />
  });
});

Router.on('decks', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckList />
  });
});

Router.on('decks/edit', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckListEdit />
  });
});

Router.on('settings', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: null
  });
});

Router.on('*', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckList />
  });
});

Router.start();
