var React = require('react');
var ReactDOM = require('react-dom');
var Fluxxor = require('fluxxor');

var Actions = require('./actions');
var Stores = require('./stores');

import Main from './components/Main';

import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

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
  mixins: [FluxMixin, StoreWatchMixin('UserStore', 'JodelsStore')],

  getInitialState: function() {
    return { newTodoText: '' };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      userData: flux.store('UserStore').getState(),
      jodelsData: flux.store('JodelsStore').getState()
    }
  },

  componentDidMount: function() {
    this.getFlux().actions.getUsersPosition();
  },

  render: function() {
    var jodels = this.state.jodels;
    return (
      <div>
      <Main />
      </div>);
  },
});

ReactDOM.render(<Application flux={flux} />, document.getElementById('app'));
