var React = require('react');
var Fluxxor = require('fluxxor');

import LoadingMap from './LoadingMap';
import MapError from './MapError';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

require('!style!css!sass!../styles/map.scss');

const FluxMixin = Fluxxor.FluxMixin(React);
const StoreWatchMixin = Fluxxor.StoreWatchMixin;

var JodelsMap = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('UserStore', 'PostsStore')],

  getInitialState: function() {
    return {}
  },

  getStateFromFlux: function() {
    const flux = this.getFlux();
    return {
      userData: flux.store('UserStore').getState(),
      postsData: flux.store('PostsStore').getState()
    }
  },

  render: function() {
    if (this.state.userData.position == null) {
      // Use default position
      var position = [
        40.783060,
        -73.971249
      ]
    } else {
      var position = [
        this.state.userData.position.latitude,
        this.state.userData.position.longitude
      ]
    }
    
    return (      
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative"
      }}>
      <Map center={position} zoom={13}>
      <TileLayer
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      { this.state.postsData.posts.map(function(post) {
        return (
          <Marker
          key={post.id}
          position={post.location.coordinate}>
          <Popup>
          <span>{post.message}</span>
          </Popup>
          </Marker>
        )
      })}     
      </Map>
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

module.exports = JodelsMap;

