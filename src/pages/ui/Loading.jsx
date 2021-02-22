import React, { Component } from 'react'
import { Alert, Card, Icon, Spin } from 'antd'
import './ui.less'

const antIcon = <Icon type="loading" />

export default class Loading extends Component {
  render() {
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          <Spin size="small"></Spin>
          <Spin size="default" style={{margin: '0 10px'}}></Spin>
          <Spin size="large"></Spin>
          <Spin size="large" indicator={antIcon}></Spin>
        </Card>
        <Card title="内容遮罩" className="card-wrap">
          <Alert
            className="spin-alert"
            message="React"
            description="欢迎来到React高级实战课程"
            type="info"
            showIcon
          />
          <Alert
            className="spin-alert"
            message="React"
            description="欢迎来到React高级实战课程"
            type="success"
            showIcon
          />
          <Spin tip="正在加载" indicator={antIcon}>
            <Alert
              className="spin-alert"
              message="React"
              description="欢迎来到React高级实战课程"
              type="warning"
              showIcon
            />
          </Spin>
          <Alert
            className="spin-alert"
            message="React"
            description="欢迎来到React高级实战课程"
            type="error"
            showIcon
          />
        </Card>
      </div>
    )
  }
}
