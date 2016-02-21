var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Main = require('./components/Main');
var Map = require('./components/Map');

var routes = (
  <Route component={Main} path='/'>
  <IndexRoute component={Map} />
  </Route>
);

module.exports = routes;
