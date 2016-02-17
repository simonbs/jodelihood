var React = require('react');

require("!style!css!sass!../styles/main.scss");

export default class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <header className="header">
          <p>&nbsp;</p>
        </header>
        <section className="content">
          <div className="content-body">
          </div>
        </section>
        <footer className="footer">
          <p>&nbsp;</p>
        </footer>
      </div>
    )
  }
}

