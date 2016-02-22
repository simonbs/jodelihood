var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
    
require('!style!css!sass!../styles/menu.scss');

var Menu = React.createClass({
  render: function() {
    return (
      <div className='menu'>
      <div className='row'>
      <div className='menu-content-wrapper menu-logo-wrapper'> 
      <div className='menu-content-inner-wrapper'>
      <Link to='home' className='logo'></Link>
      </div>
      </div>
      <div className='mobile-toggle'>
      <span></span>
      <span></span>
      <span></span>
      </div>
      <nav>
      <ul>
      <li><Link to='about'>About</Link></li>
      <li><Link to='how-does-it-work'>How does it work?</Link></li>
      <li><a href='http://twitter.com/simonbs' target='_blank'><i className='fa fa-twitter'></i></a></li>
      </ul>
      </nav>      
      </div>
      </div>
    )
  }
});

module.exports = Menu;

