// React
var React = require('react');
var ReactDOM = require('react-dom');
window.React = React;

// Fluxxor
var Stores = require('./stores');
var Actions = require('./actions');
var Fluxxor = require('fluxxor');
var flux = new Fluxxor.Flux(Stores.All, Actions.All);
window.flux = flux;

// Debugging dispatches
flux.on('dispatch', function(type, payload) {
  if (console && console.log) {
    console.log('[Dispatch]', type, payload);
  }
});

// Router
var ReactRouter = require('react-router');
import { browserHistory } from 'react-router'
var Router = ReactRouter.Router;
var createElement = function(Component, props) {
  return <Component {...props} flux={flux} />
};
var routes = require('./routes');

ReactDOM.render(
  <Router createElement={createElement} history={browserHistory} routes={routes} />,
  document.getElementById('app')
);
