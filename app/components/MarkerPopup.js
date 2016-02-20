import React from 'react';

var MarkerPopup = React.createClass({
  propTypes: {
    post: React.PropTypes.object
  },
  
  render: function() {
    return (
      <div>
      {(() => {
        if (this.props.post.image_url != null) {
          return (
            <img src={this.props.post.image_url} style={{ width: '100%' }} />
          )          
        } else {
          return <p>{this.props.post.message}</p>
        }
      })()}
      </div>
    );
  }
});

module.exports = MarkerPopup;
