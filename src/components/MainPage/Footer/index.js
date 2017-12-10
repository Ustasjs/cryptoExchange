import React, { Component } from 'react';
import './Footer.css';
import footerLogo from '../images/Logo-white.svg';

export class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container container__footer">
          <div className="footer__item footer__item_left">
            <div className="footer__info">
              <p className="footer__par">
                Сделано с любовью и старанием на курсе "React.js" в Loftschool
              </p>
              <p className="footer__par">Автор работы: Устюжанин Станислав.</p>
            </div>
          </div>
          <nav className="footer__item nav">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="" className="nav__link">
                  Главная
                </a>
              </li>
              <li className="nav__item">
                <a href="" className="nav__link">
                  Рейтинг
                </a>
              </li>
            </ul>
          </nav>
          <div className="footer__item footer__item_right">
            <div className="footer__wrap">
              <img src={footerLogo} alt="logo" className="footer__logo" />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
