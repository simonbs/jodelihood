var React = require('react');
var Fluxxor = require('fluxxor');

import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
import LoadingMap from './LoadingMap';
import MapError from './MapError';
import {default as MarkerClusterer} from "react-google-maps/lib/addons/MarkerClusterer";

require("!style!css!sass!../styles/map.scss");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Map = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('UserStore', 'PostsStore')],

  getInitialState: function() {
    return {}
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
        <div style={{ height: "100%", }} />
      }
      googleMapElement={
        <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: position.latitude, lng: position.longitude }}>
        <MarkerClusterer
        averageCenter={ true }
        enableRetinaIcons={ true }
        gridSize={ 60 }>
        { this.state.postsData.posts.map(post => (
          <Marker
          position={post.location.coordinate}
          key={post.id}
          />
        )) }
        </MarkerClusterer>
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

