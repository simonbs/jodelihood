var React = require('react');

var MapError = React.createClass({
  propTypes: {
    error: React.PropTypes.object
  },
  
  render: function() {
    return (
      <div>
      <div className='map-overlay'></div>
        <div className='map-overlay-content'>
          <div className='map-error-title'>😭</div>
          <div className='map-error-message'>Authentication with Jodel failed. Please ensure that you have given Jodelihood access to your location as this is required for authenticating with Jodel.</div>
          <div className='map-error-retry'>
            <a href='javascript:window.location.href=window.location.href'>
              Let's try that again 🚀
            </a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = MapError;
