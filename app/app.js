var React = require('react');
var ReactDOM = require('react-dom');
var Fluxxor = require('fluxxor');

var Actions = require('./actions');
var Stores = require('./stores');

import Main from './components/Main';
var flux = new Fluxxor.Flux(Stores.All, Actions.All);

window.React = React;
window.flux = flux;

flux.on('dispatch', function(type, payload) {
  if (console && console.log) {
    console.log('[Dispatch]', type, payload);
  }
});

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Application = React.createClass({
  mixins: [FluxMixin],

  componentDidMount: function() {
    this.getFlux().actions.authenticateUser();
  },

  render: function() {
    return (
      <Main />
    );
  },
});

ReactDOM.render(<Application flux={flux} />, document.getElementById('app'));
