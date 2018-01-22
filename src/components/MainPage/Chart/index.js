import React, { Component } from 'react';
import { LineChart } from 'react-chartkick';
import './Chart.css';
import Spinner from 'react-svg-spinner';

export class Chart extends Component {
  state = {
    isDataLoaded: true,
    windowWidth: 768
  };

  componentDidMount() {
    const { select } = this.props;
    select();
  }

  componentWillReceiveProps(nextProps) {
    const { isLoaded } = nextProps;
    if (isLoaded) {
      this.setState({ isDataLoaded: true });
    }

    function checkWidth() {
      const width = document.documentElement.clientWidth
      if (width <= 768) {
        this.setState({ windowWidth: width });
      }
    }

    window.addEventListener('resize', checkWidth.bind(this));
    checkWidth.call(this);
  }

  render() {
    const { min, max, purchase, sell } = this.props.data;
    const { isDataLoaded, windowWidth } = this.state;
    const shartWidth = windowWidth * 0.95 + 'px';
    const shartHeight = windowWidth * 0.95 * 0.56 + 'px';

    return (
      <div className="chart">
        <h2 className="title chart_title">Окно графика</h2>
        <ul className="chart__buttons" onClick={this.handleClick}>
          <li className="chart__button chart__button_active" data-value="2h">
            2ч
          </li>
          <li className="chart__button" data-value="4h">
            4ч
          </li>
          <li className="chart__button" data-value="8h">
            8ч
          </li>
          <li className="chart__button" data-value="1d">
            1д
          </li>
          <li className="chart__button" data-value="7d">
            7д
          </li>
        </ul>
        <div className="chart__wrap">
          {!isDataLoaded ? (
            <div className="chart__spinner">
              <Spinner size="64px" color="#555658" gap={5} />
            </div>
          ) : null}
          <div
            className={
              isDataLoaded ? 'chart__content' : 'chart__content_hidden'
            }
          >
            <LineChart
              data={[
                {
                  name: 'Продажа',
                  data: sell
                },
                {
                  name: 'Покупка',
                  data: purchase
                }
              ]}
              min={min}
              max={max}
              legend={'bottom'}
              width={shartWidth}
              height={shartHeight}
            />
          </div>
        </div>
        <br />
      </div>
    );
  }

  handleClick = e => {
    const { onClick } = this.props;
    this.setState({ isDataLoaded: false });
    onClick(e);
  };
}

export default Chart;
