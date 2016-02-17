var Fluxxor = require('fluxxor');
var Actions = require('./actions');

import {Settings} from './lib/settings';

export const UserStore = Fluxxor.createStore({
  initialize: function() {
    this.isAuthenticatingUser = true;
    this.didFailAuthenticating = false;
    this.position = Settings.getPosition();
    this.auth = null;
    
    this.bindActions(
      Actions.Constants.AUTHENTICATE_USER, this.onAuthenticateUser,
      Actions.Constants.AUTHENTICATE_USER_SUCCESS, this.onAuthenticateUserSuccess,
      Actions.Constants.AUTHENTICATE_USER_FAIL, this.onAuthenticateUserFail
    );
  },

  onAuthenticateUser: function() {
    this.isAuthenticatingUser = true;
    this.didFailAuthenticating = false;
    this.emit('change');
  },

  onAuthenticateUserSuccess: function(payload) {
    this.isAuthenticatingUser = false;
    this.didFailAuthenticating = false;
    this.position = payload.position;
    this.auth = payload.auth;
    this.emit('change');
  },

  onAuthenticateUserFail: function(payload) {
    this.isAuthenticatingUser = false;
    this.didFailAuthenticating = true;
    this.auth = null;
    this.emit('change');
  },

  getState: function() {
    return {
      isAuthenticatingUser: this.isAuthenticatingUser,
      didFailAuthenticating: this.didFailAuthenticating,
      position: this.position,
      auth: this.auth
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
