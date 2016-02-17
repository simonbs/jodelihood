var React = require('react');

import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

export default class Map extends React.Component {
  render() {
    return (
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
        ref={(map) => (this._googleMapComponent = map) && console.log(map.getZoom())}
        defaultZoom={3}
        defaultCenter={{lat: -25.363882, lng: 131.044922}}>
        </GoogleMap>
      }
      />
    )
  }
}

