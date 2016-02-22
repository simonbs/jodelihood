var React = require('react');
var Fluxxor = require('fluxxor');

import LoadingMap from './LoadingMap';
import MapError from './MapError';
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerCluster from './MarkerCluster';

require('!style!css!sass!../styles/map.scss');

var MapPage = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('UserStore', 'PostsStore')
  ],

  getInitialState: function() {
    return { }
  },

  getStateFromFlux: function() {
    const flux = this.getFlux();
    return {
      userData: flux.store('UserStore').getState(),
      postsData: flux.store('PostsStore').getState()
    }
  },

  componentDidMount: function() {
    var flux = this.getFlux();
    flux.actions.authenticateUser();
    var refreshPostsTimer = setInterval(function() {
      flux.actions.loadPosts();
    }, REFRESH_POSTS_INTERVAL * 1000);
    this.setState({ refreshPostsTimer: refreshPostsTimer });
  },

  componentWillUnmount: function() {
    if (this.state.refreshPostsTimer != null) {
      clearTimeout(this.state.refreshPostsTimer);
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
      <LeafletMap center={position} zoom={13}>
      <TileLayer
      url='http://otile3.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png'
      attribution='&copy; Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      />
      <MarkerCluster markers={this.state.postsData.posts} />
      </LeafletMap>
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

module.exports = MapPage;

