var request = require('superagent');
var FormData = require('form-data');

export const JodelClient = {
  loadPosts: function(bearer, limit, success, failure) {
    request.get('https://api.go-tellm.com/api/v2/posts?limit=' + limit)
           .set('Accept', 'application/json')
           .set('Authorization', 'Bearer ' + bearer)
           .end(function(error, response) {
             if (error != null) {
               failure(error);
             } else {
               success(response.body.posts);
             }
           });
  },
  
  place: function(bearer, position, success, failure) {
    request.put('http://api.go-tellm.com/api/v2/users/place')
           .send({
             'location[city]': position.city,
             'location[country]': position.country,
             'location[loc_accuracy]': 1000,
             'location[loc_coordinates][lat]': position.latitude,
             'location[loc_coordinates][lng]': position.longitude,
             'location[name]': position.name
           })
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
           .set('Authorization', 'Bearer ' + bearer)
           .end(function(error, response) {
             if (error != null) {
               failure(error);
             } else {
               success(response.body);
             }
           });
  },
  
  authenticate: function(position, success, failure) {
    request.post('https://api.go-tellm.com/api/v2/users')
           .send({
             'client_id': 'cd871f92-a23f-4afc-8fff-51ff9dc9184e',
             'client_secret': 'GgCwk3ElTfc3NAlX6zpnBLixKIsM4zHVWPrsUFGCeio%3D',
             'device_uid': 'GgCwk3ElTfc3NAlX6zpnBLixKIsM4zHVWPrsUFGCeio%3D',
             'location[city]': position.city,
             'location[country]': position.country,
             'location[loc_accuracy]': 1000,
             'location[loc_coordinates][lat]': position.latitude,
             'location[loc_coordinates][lng]': position.longitude,
             'location[name]': position.name
           })
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
           .end(function(error, response) {
             if (error != null) {
               failure(error);
             } else {
               success(response.body);
             }
           });
  }
}
