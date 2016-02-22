var React = require('react');

var NotFoundPage = React.createClass({  
  render: function() {
    return (
      <div className='page-content'>
      <div className='error'>
      <div className='error-title'>👀</div>
      <div className='error-message'>The page you were looking for could not be found.</div>
      </div>
      </div>
    )
  }
});

module.exports = NotFoundPage;
