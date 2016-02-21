require('!style!css!sass!../styles/menu.scss');

var Menu = React.createClass({
  render: function() {
    return (
      <div className='menu'>
      <div className='row'>
      <div className='menu-content-wrapper menu-logo-wrapper'> 
      <div className='menu-content-inner-wrapper'>
      <a className='logo' href='/'></a>
      </div>
      </div>
      <div className='mobile-toggle'>
      <span></span>
      <span></span>
      <span></span>
      </div>
      <nav>
      <ul>
      <li><a href='#'>About</a></li>
      <li><a href='#'>How does it work?</a></li>
      </ul>
      </nav>      
      </div>
      </div>
    )
  }
});

module.exports = Menu;

