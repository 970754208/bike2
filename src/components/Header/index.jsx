import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import axios from 'axios'
import Utils from '../../utils'
import './index.less'

class Header extends Component {
  constructor() {
    super();
    this.state = {
      date: null,
      city: '北京',
      weather: '晴'
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        date: Utils.formateDate(new Date())
      })
    }, 1000)
    this.setState({
      date: Utils.formateDate(new Date())
    })
    this.requestWeather();
  }
  requestWeather = () => {
    const city = 'beijing';
    axios.get(`/api/weather?key=S2IA15GUkkzuAwCBf&location=${city}&language=zh-Hans&unit=c`)
      .then(res => {
        if (res.status === 200 && res.data) {
          let result = res.data.results[0];
          this.setState({
            city: result.location.name,
            weather: result.now.text
          })
        }
      })
  }
  render() {
    const { date, city, weather } = this.state;
    const { detailPage, menuName } = this.props;
    const headClass = detailPage ? 'header detail-header' : 'header'
    return (
      <div className={headClass}>
        <Row className="header-top">
          {
            detailPage
              ? <Col span={10} className="detail-left">
                <img src="/assets/logo-ant.svg" alt="" />
                <h1>单车详情</h1>
              </Col>
              : null
          }
          <Col span={detailPage ? 14 : 24}>
            欢迎，在水一方
            <a href="/" className="quit">退出</a>
          </Col>
        </Row>
        {
          !detailPage
            ? <Row className="header-bot">
              <Col className="title" span={5}>
                { menuName }
              </Col>
              <Col className="date" span={19}>
                {date}
                <span className="city">{city}</span>
                <span className="weather">{weather}</span>
              </Col>
            </Row>
            : null
        }
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    menuName: state.menuName
  }
}
export default connect(mapStateToProps)(Header);