var React = require('react');
var Fluxxor = require('fluxxor');
  
import Map from './Map';

require('../lib/main');
require('!style!css!sass!../styles/main.scss');

// Refresh posts after an amount of secons
const REFRESH_POSTS_INTERVAL = 5 * 60;

var Main = React.createClass({
  mixins: [ Fluxxor.FluxMixin(React) ],

  componentDidMount: function() {
  console.log('Main was mounted');
    var flux = this.getFlux();
    flux.actions.authenticateUser();
    var refreshPostsTimer = setInterval(function() {
      flux.actions.loadPosts();
    }, REFRESH_POSTS_INTERVAL * 1000);
    this.setState({ refreshPostsTimer: refreshPostsTimer });
  },

  componentWillUnmount: function() {
    if (this.state.refreshPostsTimer != null) {
      clearTimeout(this.state.refreshPostsTimer);
    }
  },
  
  render: function() {
    return (
      <div className='container'>
        <header className='header'>
          <p>&nbsp;</p>
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
