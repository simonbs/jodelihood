var Fluxxor = require('fluxxor');
var Actions = require('./actions');

export const UserStore = Fluxxor.createStore({
  initialize: function() {
    this.waitingForUsersPosition = false;
    this.position = null;
    this.bearer = null;

    this.bindActions(
      Actions.Constants.GET_USERS_POSITION, this.onGetUsersPosition,
      Actions.Constants.GET_USERS_POSITION_SUCCESS, this.onGetUsersPositionSuccess,
      Actions.Constants.GET_USERS_POSITION_FAIL, this.onGetUsersPositionFail
    );
  },

  onGetUsersPosition: function() {
    this.waitingForUsersPosition = true;
    this.emit('change');
  },

  onGetUsersPositionSuccess: function(payload) {
    this.waitingForUsersPosition = false;
    this.position = {
      'latitude': payload['coords']['latitude'],
      'longitude': payload['coords']['longitude']
    };
    this.emit('change');
    },

  onGetUsersPositionFail: function(payload) {
    this.waitingForUsersPosition = false;
    this.position = null;
    this.emit('change');
  },

  getState: function() {
    return {
      waitingForUsersPosition: this.waitingForUsersPosition,
      position: this.position,
      bearer: this.bearer
    };
  }
});

export const PostsStore = Fluxxor.createStore({
  initialize: function() {
    this.posts = {};

    this.bindActions(
      Actions.Constants.LOAD_POSTS, this.onLoadPosts
    );
  },

  onLoadPosts: function(payload) {
    this.posts = {};
    this.emit('change');
  },

  getState: function() {
    return {
      posts: this.posts
    };
  }
});

export const All = {
  UserStore: new UserStore(),
  PostsStore: new PostsStore()
};
