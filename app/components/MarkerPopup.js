import React from 'react';

var MarkerPopup = React.createClass({
  propTypes: {
    post: React.PropTypes.object
  },
  
  render: function() {
    return (
      <div>
      <p>{this.props.post.message}</p>
      </div>
    );
  }
});

module.exports = MarkerPopup;
