var React = require('react');

import Map from './Map';
import '../lib/main';

require('!style!css!sass!../styles/main.scss');

var Main = React.createClass({
  render: function() {
    return (
      <div className="container">
        <header className="header">
          <p>&nbsp;</p>
        </header>
        <section className="content">
          <div className="content-body">
            <Map />
          </div>
        </section>
      </div>
    )
  }
});

module.exports = Main;
