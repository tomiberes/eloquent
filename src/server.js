// Note on isomorphic web app approach

// Isomorphic app have single route handler for all routes '*',
// retrieves the data according to the requested route path from data source
// DB / API.
// It populates the main component view and renders it into HTML string,
// which is then sent to the client, together with JS app code.
// Client JS app updates itself according to the user interactions,
// fetching the data from data source DB / API on its own, AJAX.

// Routing can be done with react-router, yahoo flux example
// or event without check Dispatchers handleViewAction, handleServerAction functions
// and their usage in project at: https://github.com/kriasoft/react-starter-kit

// Babel require hook https://babeljs.io/docs/usage/require/
require('babel/register');
