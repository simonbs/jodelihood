export const GoogleClient = {
  lookupUserPosition: function(position, success, failure) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    /* lat = 55.696883; */
    /* lng = 12.594022; */
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == 'OK') {
        // The OK status is guaranteed to give a result.
        // https://developers.google.com/maps/documentation/javascript/geocoding
        var comps = results[0].address_components
        var city = null
        var country = null
        var name = null
        comps.forEach(function(e) {
          if (e.types.indexOf('country') != -1) {
            country = e.short_name
          } else if (e.types.indexOf('locality') != -1) {
            city = e.long_name
          } else if (e.types.indexOf('sublocality_level_1') != -1) {
            name = e.long_name
            }
        });
        if (city != null && country != null) {          
          success({
            'latitude': lat,
            'longitude': lng,
            'city': city,
            'country': country,
            'name': name // Optional
          });
        } else {
          failure();
        }
      } else {
        failure();
      }
    });
  }
}
