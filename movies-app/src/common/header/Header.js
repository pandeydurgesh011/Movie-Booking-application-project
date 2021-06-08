import './Header.css';
import React from 'react';
import logo from '../../assets/logo.svg';

class Header extends React.Component {
    render() {
            return <div>
                    <header className="header">
                        <img className="header-logo" src={logo}  alt="Movies App Logo" />
                    </header>
                </div>
            
  }
}
export default Header