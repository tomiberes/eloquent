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

if (process.env.NODE_ENV === 'development') {
  window.React = React;
}

export const router = new Router();

function navigate(args, components) {
  AppActions.urlChange(args);
  ReactDOM.render(<Main {...components} />, document.getElementById('root'));
}

DeckActions.getAll();

router.on('deck/:id/edit/', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckEdit />
  });
});

router.on('deck/:id/edit/:index', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckEntryEdit />
  });
});

router.on('deck/:id/:index', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckEntry />
  });
});

router.on('decks', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckList />
  });
});

router.on('decks/edit', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckListEdit />
  });
});

router.on('settings', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: null
  });
});

router.on('*', (match) => {
  navigate(match.args, {
    topbar: <TopBar />,
    section: <DeckList />
  });
});

router.start();
