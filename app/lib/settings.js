var store = require('store');

export const Settings = {
  setAuth: function(auth) {
    store.set('auth', auth);
  },

  getAuth: function() {
    return store.get('auth');
  },

  setPosition: function(position) {
    store.set('position', position);
  },

  getPosition: function(position) {
    return store.get('position');
  },

  hasValidAuth: function() {
    var auth = store.get('auth');
    var now = Math.floor(Date.now() / 1000);
    return auth != null && auth.expiration_date > now;
  }
}
