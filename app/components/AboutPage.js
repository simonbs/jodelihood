var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var AboutPage = React.createClass({  
  render: function() {
    return (
      <div className='page-content'>
      <div className='page-title'>About</div>
      <p>The smartphone application <a href='http://jodel-app.com' target='_blank'>Jodel</a> lets users anonymously post short messages and photos that are visible to other nearby users. Jodlihood shows <Link to='/'>a map</Link> of all recent posts made by users that are near the visitor of this website.<br /><br />      
      Jodel is meant to be an anonymous community in which the author of each post is unknown and personal information is kept, well, personal. The company behind Jodel emphasize this on their website as part of the <a href='https://jodel-app.com/whats-jodel/' target='_blank'>"What Jodel is all about?"</a> section. As of February 22, 2016 the company writes that the service lets you <i>"connect with fellow students <strong>without exposing your personal information</strong>"</i>. This is not the case. Personal information is unnecessarily exposed.<br /><br />
      Jodel shows a rough distance between the user of the application and the author of each post in the timeline of the community. In order to calculate the distance between users, the latitude and longitude form which each post was made must be stored on the backend. This distance can be, should be and in fact is calculated on Jodels backend and is sent to the smartphone app whenever a user loads all posts from nearby users. However, while the distance is calculated on the backend the developers of Jodel also provides the latitude and longitude from which each post was made in th response sent to the application. This compromises the privacy of the users.<br /><br />
      This data is never visible to users in the application but it is provided in the data sent from Jodels backend to the smartphone application and is essentially publicly available, as demonstrated by this website.<br /><br />
      <strong>The purpose of Jodlihood has never been to expose Jodel in any negative way.</strong> I am a user of the app. I like the app. I do, however, intend to examplify the consequences careless handling of sensitive data has.<br /><br />
      <strong>Please note</strong> that while all of this sounds very scary, the locations sent from the backend to the app has a radius of about 500 meters.</p>
      </div>
    )
  }
});

module.exports = AboutPage;
