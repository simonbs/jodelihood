import React from 'react';
import Leaflet from 'leaflet';
import MarkerPopup from './MarkerPopup';
import { MapLayer } from 'react-leaflet';

var _ = require('underscore');
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

    // Remove existing markers
    if (this.markers != null) {
      this.leafletElement.removeLayers(this.markers);
    }
    
    // Add markers to cluster layer
    if (nextProps.markers.length > 0) {
      let markers = [];
      nextProps.markers.forEach((post) => {
        let markerPopup = ReactDOMServer.renderToStaticMarkup(
          <MarkerPopup post={post} />
        );

        var markerIcon = L.divIcon({
          html: markerHTMLForPost(post),
          className: 'map-marker',
          iconSize: [35, 35]
        });

        let map = this.props.map;
        let leafletMarker =
        Leaflet.marker(post.location.coordinate, { icon: markerIcon })
               .bindPopup(markerPopup, {
                 maxHeight: 450,
                 maxWidth: 300,
                 minWidth: 250,
                 closeButton: false,
                 className: 'map-popup map-popup-' + post.color
               })
               .on('popupclose', function() {
                 if (nextProps.onPopupClosed != null) {
                   nextProps.onPopupClosed(leafletMarker);
                 }
               })
               .on('popupopen', function() {
                 if (nextProps.onPopupOpened != null) {
                   nextProps.onPopupOpened(leafletMarker);
                 }
               })
               .on('click', function() {
                 // Offset the coordinate a bit to ensure images are displayed on the screen.
                 let latOffset = post.image_url != null ? 0.02 : 0
                 map.panTo({
                   lat: post.location.coordinate.lat + latOffset,
                   lng: post.location.coordinate.lng
                 })
               });
        
        markers.push(leafletMarker);
      });
      
      this.markers = markers;
      this.leafletElement.addLayers(markers);
    }

    // Zoom to particular marker
    if (Object.keys(nextProps.focusMarker).length > 0) {
      let marker = this.props.markers[nextProps.focusMarker.id];
      this.leafletElement.zoomToShowLayer(marker, () => {
        this.props.map.panTo(nextProps.focusMarker.coordinate);
        marker.openPopup();
      });
    }

    // Clear previous refresh interval
    if (this.state != null && this.state.markerRefreshInterval != null) {
      clearInterval(this.state.markerRefreshInterval);
    }

    // Refresh markers every second to keep times up to date
    var posts = nextProps.markers;
    var markers = this.markers;
    var leafletElement = this.leafletElement;
    var markerRefreshInterval = setInterval(function() {
      _.zip(markers, posts).forEach(function(pair) {
        pair[0].refreshIconOptions({
          html: markerHTMLForPost(pair[1])
        });
      });
    }, 1000);
    this.leafletElement.refreshClusters(markers);
    this.setState({ markerRefreshInterval: markerRefreshInterval })
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

function markerHTMLForPost(post) {
  return '<div class="map-marker-inner" style="background-color:#' + post.color + ';">' +
         jQuery.timeago(post.created_at)
         '</div>';
}

MarkerCluster.propTypes = {
  focusMarker: React.PropTypes.object,
  map: React.PropTypes.object,
  markers: React.PropTypes.array,
  onPopupOpened: React.PropTypes.func,
  onPopupClosed: React.PropTypes.func
};

MarkerCluster.defaultProps = {
  markers: [],
  focusMarker: {},
  onPopupOpened: null,
  onPopupClosed: null
};

export default MarkerCluster;
