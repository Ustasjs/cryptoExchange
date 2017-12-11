import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import headerLogo from '../images/Logo-white.svg';

export class Header extends Component {
  render() {
    const { url } = this.props.match;
    const { onClick, currentPriceEth, currentPriceBtc } = this.props;
    return (
      <header className="header">
        <div className="container container_header">
          <div className="header__item header__item_left">
            <div className="header__wrap">
              <img src={headerLogo} alt="logo" className="header__logo" />
            </div>
          </div>
          <ul className="header__item">
            <li className="currency">
              <NavLink
                onClick={onClick}
                to={`${url}/btc`}
                className="currency__link"
                id="btc-link"
                activeClassName="currency__link_active"
              >
                <div className="currency__value" id="btcCurrentValue">
                  {currentPriceBtc}
                </div>
                <div className="currency__type">1 BTC</div>
              </NavLink>
            </li>
            <li className="currency">
              <NavLink
                onClick={onClick}
                to={`${url}/eth`}
                className="currency__link"
                id="eth-link"
                activeClassName="currency__link_active"
              >
                <div className="currency__value" id="ethCurrentValue">
                  {currentPriceEth}
                </div>
                <div className="currency__type">1 ETH</div>
              </NavLink>
            </li>
          </ul>
          <ul className="header__item header__item_right">
            <li className="header__link">1 место</li>
            <li className="header__link">user email</li>
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
