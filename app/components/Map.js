var React = require('react');
var Fluxxor = require('fluxxor');

import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import LoadingMap from './LoadingMap';
import MapError from './MapError';

require("!style!css!sass!../styles/map.scss");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Map = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('UserStore', 'PostsStore')],

  getInitialState: function() {
    return {
      isAuthenticatingUser: true,
      didFailAuthenticating: false
    };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      userData: flux.store('UserStore').getState(),
      postsData: flux.store('PostsStore').getState()
    }
  },
  
  render: function() {
    if (this.state.userData.position == null) {
      // Use default position
      var position = {
        latitude: 40.783060,
        longitude: -73.971249
      }
    } else {
      position = this.state.userData.position
    }
      
    return (
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative"
      }}>
      <div style={{
        width: "100%",
        height: "100%",
        position: "absolute"
      }}>
      <GoogleMapLoader
      containerElement={
        <div
        {...this.props}
        style={{
          height: "100%",
        }}
        />
      }
      googleMapElement={
        <GoogleMap
        ref={(map) => (this._googleMapComponent = map)}
        defaultZoom={12}
        defaultCenter={{lat: position.latitude, lng: position.longitude}}>
        </GoogleMap>
      }
      />
      </div>
      {(() => {
        if (this.state.userData.isAuthenticatingUser) {
          return <LoadingMap />
        } else if (this.state.userData.didFailAuthenticating) {
          return <MapError />
        }
      })()}
      </div>
    )
  }
});

module.exports = Map;

