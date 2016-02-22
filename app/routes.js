var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Main = require('./components/Main');
var MapPage = require('./components/MapPage');
var AboutPage = require('./components/AboutPage');
var NotFoundPage = require('./components/NotFoundPage');

var routes = (
  <Route component={Main} path='/'>
  <Route component={AboutPage} path='about' />
  <IndexRoute component={MapPage} />
  <Router path='*' component={NotFoundPage} />
  </Route>
);

module.exports = routes;
