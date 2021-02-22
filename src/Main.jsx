import React, { Component } from 'react'
import { Row, Col } from 'antd'
import NavLeft from './components/NavLeft'
import Header from './components/Header'
import Footer from './components/Footer'

export default class Main extends Component {
  render() {
    return (
      <div className="nav-left">
        <Row>
          <Col span={4} className="lay-nav-left">
            <NavLeft />
          </Col>
          <Col span={20} className="lay-right">
            <Header />
            <div className="content">
              {this.props.children}
            </div>
            <Footer />
          </Col>
        </Row>
      </div>
    )
  }
}
