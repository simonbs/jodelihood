import React from 'react';
import Leaflet from 'leaflet';
import MarkerPopup from './MarkerPopup';
import { MapLayer } from 'react-leaflet';

var jQuery = require('jquery');
var timeago = require('timeago');

var ReactDOMServer = require('react-dom/server');
require('leaflet.markercluster');

class MarkerCluster extends MapLayer {
  componentWillMount() {
    super.componentWillMount();
    this.leafletElement = Leaflet.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html: cluster.getChildCount(),
          className: 'map-cluster',
          iconSize: L.point(55, 55)
        });
      },
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      spiderfyDistanceMultiplier: 1.5
    });
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);

    // add markers to cluster layer
    if (nextProps.markers.length > 0) {
      let markers = [];
      nextProps.markers.forEach((post) => {
        let markerPopup = ReactDOMServer.renderToStaticMarkup(
          <MarkerPopup
          post={post}
          />
        );

        var markerIcon = L.divIcon({
          html: '<div class="map-marker-inner" style="background-color:#' + post.color + ';">' + jQuery.timeago(post.created_at) + '</div>',
          className: 'map-marker',
          iconSize: [35, 35]
        });
        let leafletMarker =
        Leaflet.marker(post.location.coordinate, { icon: markerIcon })
               .bindPopup(markerPopup, {
                 maxHeight: 350,
                 maxWidth: 250,
                 minWidth: 250
               })
               .on('click', () => this.props.map.panTo(post.location.coordinate));
        
        markers.push(leafletMarker);
      });
      
      this.leafletElement.addLayers(markers);
    }

    // zoom to particular marker
    if (Object.keys(nextProps.focusMarker).length > 0) {
      let marker = this.props.markers[nextProps.focusMarker.id];
      this.leafletElement.zoomToShowLayer(marker, () => {
        this.props.map.panTo(nextProps.focusMarker.coordinate);
        marker.openPopup();
      });
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

MarkerCluster.propTypes = {
  focusMarker: React.PropTypes.object,
  map: React.PropTypes.object,
  markers: React.PropTypes.array,
};

MarkerCluster.defaultProps = {
  markers: [],
  focusMarker: {},
};

export default MarkerCluster;
