import React, { Component } from 'react'
import { Row, Col } from 'antd'
import axios from 'axios'
import Utils from '../../utils'
import './index.less'

export default class Header extends Component {
  constructor () {
    super();
    this.state = {
      date: null,
      city: '北京',
      weather: '晴'
    }
  }
  componentDidMount () {
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
    return (
      <div className="header">
        <div className="header-top">
          欢迎，在水一方
          <a href="/" className="quit">退出</a>
        </div>
        <Row className="header-bot">
          <Col className="title" span={5}>
            首页
          </Col>
          <Col className="date" span={19}>
            {date}
            <span className="city">{city}</span>
            <span className="weather">{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
