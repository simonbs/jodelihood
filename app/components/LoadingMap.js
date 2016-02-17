var React = require('react');

require("!style!css!sass!../styles/loading-map.scss");

var LoadingMap = React.createClass({
  render: function() {
    return (
      <div>
      <div className='map-overlay'></div>
        <div className='spinner-area'>
          <div className='spinner'>
            <div className='bounce1'></div>
            <div className='bounce2'></div>
            <div className='bounce3'></div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = LoadingMap;
