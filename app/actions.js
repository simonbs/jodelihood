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
    this.dispatch(Constants.AUTHENTICATE_USER);
    if (!Settings.hasValidAuth()) {
      authenticateNewUser(this);
    } else {
      placeExistingUser(this, Settings.getAuth().access_token);
    }
  },
  
  loadPosts: function() {
    this.dispatch(Constants.LOAD_POSTS);
  },
};

function placeExistingUser(flux, bearer) {
  getUsersPosition(function(position) {
    Settings.setPosition(position);
    JodelClient.place(bearer, position, function(auth) {
      flux.dispatch(Constants.AUTHENTICATE_USER_SUCCESS, {
        position: position,
        auth: Settings.getAuth(),
      });
    }, function(error) {        
      flux.dispatch(Constants.AUTHENTICATE_USER_POSITION_FAIL);
    });
  }, function() {
    // Failed getting users position
    flux.dispatch(Constants.AUTHENTICATE_USER_POSITION_FAIL);
  });    
}

function authenticateNewUser(flux) {
  getUsersPosition(function(position) {
    Settings.setPosition(position);
    JodelClient.authenticate(position, function(auth) {
      Settings.setAuth(auth);
      flux.dispatch(Constants.AUTHENTICATE_USER_SUCCESS, {
        position: position,
        auth: auth,
      });
    }, function(error) {        
      flux.dispatch(Constants.AUTHENTICATE_USER_POSITION_FAIL);
    });
  }, function() {
    flux.dispatch(Constants.AUTHENTICATE_USER_POSITION_FAIL);
  });    
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
