var React = require('react');
var Fluxxor = require('fluxxor');
  
var Menu = require('./Menu');

require('jquery');
require('../lib/main');
require('!style!css!sass!../styles/main.scss');

// Refresh posts after an amount of secons
const REFRESH_POSTS_INTERVAL = 5 * 60;

var Main = React.createClass({  
  render: function() {
    return (
      <div className='container'>
        <header className='header'>
          <Menu />
        </header>
        <section className='content'>
          <div className='content-body'>
            {this.props.children}
          </div>
        </section>
      </div>
    )
  }
});

module.exports = Main;
