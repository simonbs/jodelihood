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

// Refresh posts after an amount of secons
const REFRESH_POSTS_INTERVAL = 5 * 60;

var Application = React.createClass({
  mixins: [FluxMixin],

  componentDidMount: function() {
    var flux = this.getFlux();
    flux.actions.authenticateUser();
    var refreshPostsTimer = setInterval(function() {
      flux.actions.loadPosts();
    }, REFRESH_POSTS_INTERVAL * 1000);
    this.setState({ refreshPostsTimer: refreshPostsTimer });
  },

  componentWillUnmount: function() {
    if (this.state.refreshPostsTimer != null) {
      clearTimeout(this.state.refreshPostsTimer);
    }
  },

  render: function() {
    return (
      <Main />
    );
  },
});

ReactDOM.render(<Application flux={flux} />, document.getElementById('app'));
