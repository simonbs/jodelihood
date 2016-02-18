var React = require('react');

import JodelsMap from './JodelsMap';

require("!style!css!sass!../styles/main.scss");

var Main = React.createClass({
  render: function() {
    return (
      <div className="container">
        <header className="header">
          <p>&nbsp;</p>
        </header>
        <section className="content">
          <div className="content-body">
            <JodelsMap />
          </div>
        </section>
        <footer className="footer">
          <p>&nbsp;</p>
        </footer>
      </div>
    )
  }
});

module.exports = Main;
