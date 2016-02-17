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

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Application = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('UserStore', 'PostsStore')],

  getInitialState: function() {
    return { newTodoText: '' };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      userData: flux.store('UserStore').getState(),
      postsData: flux.store('PostsStore').getState()
    }
  },

  componentDidMount: function() {
    this.getFlux().actions.getUsersPosition();
  },

  render: function() {
    return (
      <Main />
    );
  },
});

ReactDOM.render(<Application flux={flux} />, document.getElementById('app'));
