import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Header from '@/components/Header'

export default class Common extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Header detailPage={true} />
          </Col>
          <Col className="content">
            {this.props.children}
          </Col>
        </Row>
      </div>
    )
  }
}
