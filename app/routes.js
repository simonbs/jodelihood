var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var NotFoundRoute = ReactRouter.NotFoundRoute;

var Main = require('./components/Main');
var MapPage = require('./components/MapPage');
var AboutPage = require('./components/AboutPage');
var HowItWorksPage = require('./components/HowItWorksPage');
var NotFoundPage = require('./components/NotFoundPage');

var routes = (
  <Route component={Main} name='home' path='/'>
  <Route component={AboutPage} name='about' path='about' />
  <Route component={HowItWorksPage} name='how-it-works' path='how-it-works' />
  <IndexRoute component={MapPage} />
  <Router path='*' component={NotFoundPage} />
  </Route>
);

module.exports = routes;
