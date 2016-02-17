export const Constants = {
  GET_USERS_POSITION: 'GET_USERS_POSITION',
  GET_USERS_POSITION_SUCCESS: 'GET_USERS_POSITION_SUCCESS',
  GET_USERS_POSITION_FAIL: 'GET_USERS_POSITION_FAIL',
  
  LOAD_USER: 'LOAD_USER',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
  LOAD_USER_FAIL: 'LOAD_USER_FAIL',
  
  LOAD_POSTS: 'LOAD_POSTS',
  LOAD_POSTS_SUCCESS: 'LOAD_POSTS_SUCCESS',
  LOAD_POSTS_FAIL: 'LOAD_POSTS_FAIL'
};

export const All = {
  getUsersPosition: function() {
    var actions = this;
    actions.dispatch(Constants.GET_USERS_POSITION);
    var success = function(position) {
      actions.dispatch(Constants.GET_USERS_POSITION_SUCCESS, position);
    }
    var failure = function(error) {
      actions.dispatch(Constants.GET_USERS_POSITION_FAIL);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, failure);
    }
  },
  
  loadJodels: function() {
    this.dispatch(Constants.LOAD_POSTS);
  }  
};
