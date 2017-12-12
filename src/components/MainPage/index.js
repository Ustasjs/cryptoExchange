import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chart from './Chart';
import Account from './Account';
import TradeControls from './TradeControls';
import './MainPage.css';
import {
  getBtc,
  getEth,
  getBtcLoadingState,
  getEthLoadingState
} from '../../reducers/currency';
import { selectBtc, selectEth, selectOffset } from '../../actions/currency';

export class MainPage extends Component {
  render() {
    const { url } = this.props.match;
    const {
      btc,
      eth,
      btcLoadingState: { isLoaded: isBtcLoaded },
      ethLoadingState: { isLoaded: isEthLoaded }
    } = this.props;
    const currentPriceBtc = btc.currentPrice;
    const currentPriceEth = eth.currentPrice;

    return (
      <div className="mainPage">
        <Header
          match={this.props.match}
          onClick={this.handleCurrencyClick}
          currentPriceBtc={currentPriceBtc}
          currentPriceEth={currentPriceEth}
        />
        <main className="content">
          <div className="wrapper">
            <div className="container container_content">
              <section className="trade">
                <Account />
                <TradeControls />
              </section>
              <section className="data">
                <Switch>
                  <Route
                    ololo={'ololo'}
                    path={`${url}/btc`}
                    exact
                    render={props => (
                      <Chart
                        onClick={this.handleOffsetClick}
                        data={btc}
                        isLoaded={isBtcLoaded}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    ololo={'ololo'}
                    path={`${url}/eth`}
                    exact
                    render={props => (
                      <Chart
                        onClick={this.handleOffsetClick}
                        data={eth}
                        isLoaded={isEthLoaded}
                        {...props}
                      />
                    )}
                  />
                </Switch>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  handleCurrencyClick = e => {
    const { selectBtc, selectEth } = this.props;
    const elementId = e.currentTarget.getAttribute('id');
    if (elementId === 'btc-link') {
      selectBtc();
    } else {
      selectEth();
    }
  };

  handleOffsetClick = e => {
    const { selectOffset } = this.props;
    const value = e.target.dataset.value;
    const elements = document.querySelectorAll('[data-value]');
    if (value) {
      selectOffset(value);
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('chart__button_active')) {
          elements[i].classList.remove('chart__button_active');
        }
      }
      e.target.classList.add('chart__button_active');
    }
  };
}

const mapStateToProps = state => ({
  btc: getBtc(state),
  eth: getEth(state),
  btcLoadingState: getBtcLoadingState(state),
  ethLoadingState: getEthLoadingState(state)
});
const mapDispatchToProps = {
  selectBtc,
  selectEth,
  selectOffset
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
