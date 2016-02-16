var React = require("react");
var ReactDOM = require("react-dom");
var Fluxxor = require("fluxxor");

var Actions = require('./actions');
var Stores = require('./stores');

window.React = React;

var flux = new Fluxxor.Flux(Stores.All, Actions.All);

window.flux = flux;

flux.on("dispatch", function(type, payload) {
  if (console && console.log) {
    console.log("[Dispatch]", type, payload);
  }
});

var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Application = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("JodelsStore")],

  getInitialState: function() {
    return { newTodoText: "" };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    // Our entire state is made up of the TodoStore data. In a larger
    // application, you will likely return data from multiple stores, e.g.:
    //
    //   return {
    //     todoData: flux.store("TodoStore").getState(),
    //     userData: flux.store("UserStore").getData(),
    //     fooBarData: flux.store("FooBarStore").someMoreData()
    //   };
    return flux.store("JodelsStore").getState();
  },

  render: function() {
    var jodels = this.state.jodels;
    return (
      <div>
      </div>
    );
  },
});

ReactDOM.render(<Application flux={flux} />, document.getElementById("app"));
