import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent(){
    switch (this.props.auth) {
      case null: 
        return 'Waiting';
      case false: 
         return <li><a href="/auth/google">Login with Google</a></li>;
      default: 
      return <li><a href="/api/logout">Logout</a></li>;
    }
  }
  render () {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link 
          to={this.props.auth ? '/surveys' : '/'} 
          className='brand-logo'>
          Matreshka
          </Link>
          <ul id='nav-mobile' className='right'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStatetoProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStatetoProps)(Header);
