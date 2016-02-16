var Fluxxor = require("fluxxor");
var Actions = require('./actions');

export const JodelsStore = Fluxxor.createStore({
  initialize: function() {
    this.jodels = {};

    this.bindActions(
      Actions.Constants.JODELS_REFRESH, this.onJodelsRefresh
    );
  },

  onJodelsRefresh: function(payload) {
    this.jodels = {};
    this.emit("change");
  },

  getState: function() {
    return {
      jodels: this.jodels
    };
  }
});

export const All = {
  JodelsStore: new JodelsStore()
};
