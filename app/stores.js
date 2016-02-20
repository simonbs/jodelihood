var _ = require('underscore');
var Fluxxor = require('fluxxor');
var Actions = require('./actions');

import {Settings} from './lib/settings';

export const UserStore = Fluxxor.createStore({
  initialize: function() {
    this.isAuthenticatingUser = true;
    this.didFailAuthenticating = false;
    // Default position is New York
    this.position = Settings.getPosition()
    this.auth = null;
    this.authError = null;
    
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
    this.authError = null;
    this.emit('change');
  },

  onAuthenticateUserFail: function(payload) {
    this.isAuthenticatingUser = false;
    this.didFailAuthenticating = true;
    this.auth = null;
    this.authError = payload.error;
    this.emit('change');
  },

  getState: function() {
    return {
      isAuthenticatingUser: this.isAuthenticatingUser,
      didFailAuthenticating: this.didFailAuthenticating,
      position: this.position,
      auth: this.auth,
      authError: this.authError
    };
  }
});

export const PostsStore = Fluxxor.createStore({
  initialize: function() {
    this.posts = [];

    this.bindActions(
      Actions.Constants.AUTHENTICATE_USER_SUCCESS, this.onAuthenticateUserSuccess,
      Actions.Constants.LOAD_POSTS, this.onLoadPosts,
      Actions.Constants.LOAD_POSTS_SUCCESS, this.onLoadPostsSuccess,
      Actions.Constants.LOAD_POSTS_FAIL, this.onLoadPostsFail
    );
  },

  onAuthenticateUserSuccess: function(payload) {
    this.posts = parsePosts(payload.posts);
    this.emit('change');
  },

  onLoadPosts: function(payload) { },

  onLoadPostsSuccess: function(payload) {
    this.posts = parsePosts(payload.posts);
    this.emit('change');
  },

  onLoadPostsFail: function(payload) { },

  getState: function() {
    return {
      posts: this.posts
    };
  }
});

function parsePosts(posts) {
  return _.chain(posts)
          .filter((post => post.post_own != "team"))
          .map(function(post) {
            return {
              id: post.post_id,
              location: {
                name: post.location.name,
                coordinate: {
                  lat: parseFloat(post.location.loc_coordinates.lat),
                  lng: parseFloat(post.location.loc_coordinates.lng)
                }
              },
              color: post.color,
              created_at: post.created_at,
              vote_count: post.vote_count,
              message: post.message,
              post_own: post.post_own,
              distance: post.distance,
              child_count: post.child_count,
              image_url: post.image_url != null ? "http://" + post.image_url : null,
              thumbnail_url: post.thumbnail_url
            }
          }).value();
}

export const All = {
  UserStore: new UserStore(),
  PostsStore: new PostsStore()
};
