import {GoogleClient} from './lib/google-client';
import {JodelClient} from './lib/jodel-client';
import {Settings} from './lib/settings';

export const Constants = {
  AUTHENTICATE_USER: 'AUTHENTICATE_USER',
  AUTHENTICATE_USER_SUCCESS: 'AUTHENTICATE_USER_SUCCESS',
  AUTHENTICATE_USER_FAIL: 'AUTHENTICATE_USER_FAIL',
  
  LOAD_POSTS: 'LOAD_POSTS',
  LOAD_POSTS_SUCCESS: 'LOAD_POSTS_SUCCESS',
  LOAD_POSTS_FAIL: 'LOAD_POSTS_FAIL'
};

export const All = {
  authenticateUser: function() {
    var actions = this;
    this.dispatch(Constants.AUTHENTICATE_USER);
    var failure = function(error) {      
      actions.dispatch(Constants.AUTHENTICATE_USER_FAIL, { error: error });
    }
    var authSuccess = function(auth, position) {
      JodelClient.loadPosts(Settings.getAuth().access_token, function(posts) {
        console.log(posts);
        actions.dispatch(Constants.AUTHENTICATE_USER_SUCCESS, {
          auth: auth,
          position: position,
          posts: posts
        });
      }, failure);
    }
    if (!Settings.hasValidAuth()) {
      authenticateNewUser(authSuccess, failure);
    } else {
      placeExistingUser(Settings.getAuth().access_token, authSuccess, failure);
    }
  },
  
  loadPosts: function() {
    var actions = this;
    this.dispatch(Constants.LOAD_POSTS);
    JodelClient.loadPosts(Settings.getAuth().access_token, function(posts) {
      console.log(posts);
      actions.dispatch(Constants.LOAD_POSTS_SUCCESS, { posts: posts });
    }, function (error) {
      actions.dispatch(Constants.LOAD_POSTS_FAIL, { error: error });
    });
  },
};

function placeExistingUser(bearer, success, failure) {
  getUsersPosition(function(position) {
    Settings.setPosition(position);
    JodelClient.place(bearer, position, function(auth) {
      success(Settings.getAuth(), position);
    }, failure);
  }, failure);    
}

function authenticateNewUser(success, failure) {
  getUsersPosition(function(position) {
    Settings.setPosition(position);
    JodelClient.authenticate(position, function(auth) {
      Settings.setAuth(auth);
      success(auth, position);
    }, failure);
  }, failure);    
}

function getUsersPosition(success, failure) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      GoogleClient.lookupUserPosition(position, success, failure);
    }, failure);
  } else {
    failure();
  }
}
