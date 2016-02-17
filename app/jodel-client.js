require('es6-promise').polyfill();
require('isomorphic-fetch');

export const JodelClient = {
  loadUser: function(success, failure) {
    fetch('https://api.go-tellm.com/api/v2/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
    })
  }
}
