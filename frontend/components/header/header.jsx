import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
  }

  handleLogOut(e){
    e.preventDefault();
    this.props.logout();
  }

  handleGuest(e){
    e.preventDefault();
    const user = {
      username: 'guest',
      password: 'abc123'
    };
    this.props.login({user});
  }

  render(){
    let greeting;
    if(this.props.currentUser){
      greeting = (
        <nav className="user-greeting">
          <a id="welcome">Welcome, {this.props.currentUser.username}!</a>
          <a className="logout" onClick={ this.handleLogOut }>LOGOUT</a>
        </nav>
      );
    }else {
      greeting = (
        <nav className="login-signup">
          <Link to="/login">LOGIN</Link>
          &nbsp;&nbsp;
          <Link to="/signup">SIGNUP</Link>
          &nbsp;&nbsp;
          <a onClick={ this.handleGuest }>GUEST</a>
        </nav>
      );
    }

    return (
      <div>
        <div className="header">
          <Link to="/" className="logo">Expense Tracker</Link>
          {greeting}
        </div>
    </div>

    );
  }
}


export default Header;
