import React from 'react';

var MarkerPopup = React.createClass({
  propTypes: {
    post: React.PropTypes.object
  },
  
  render: function() {
    return (
      <div className='map-popup-wrapper'>
      <div className='map-popup-content'>
      {(() => {
        if (this.props.post.image_url != null) {
          return (
            <p className='map-popup-content-image'>
            <img src={this.props.post.image_url} style={{ width: '100%' }} />
            </p>
          )          
        } else {
          return <p>{this.props.post.message}</p>
        }
      })()}
      </div>
      <div className='map-popup-votes'>
      <div className='votes-title'>Votes</div>
      <div className='votes-count'>{this.props.post.vote_count}</div>
      </div>
      </div>
    );
  }
});

module.exports = MarkerPopup;
