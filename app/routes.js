var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Main = require('./components/Main');
var MapPage = require('./components/MapPage');
var AboutPage = require('./components/AboutPage');
var HowItWorksPage = require('./components/HowItWorksPage');

var routes = (
  <Route component={Main} name='home' path='/'>
  <Route component={AboutPage} name='about' path='about' />
  <Route component={HowItWorksPage} name='how-it-works' path='how-it-works' />
  <IndexRoute component={MapPage} />
  </Route>
);

module.exports = routes;
