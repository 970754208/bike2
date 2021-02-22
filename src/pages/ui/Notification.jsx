import React, { Component } from 'react'
import { Button, Card, notification } from 'antd'
import './ui.less'

export default class INotification extends Component {
  handleNot = (type, placement) => {
    notification[type]({
      message: '发工资了',
      description: '满勤+项目提成+工资=1000万',
      closeIcon: "close now",
      btn: <Button>关闭</Button>,
      placement
    })
  }
  render() {
    return (
      <div>
        <Card title="通知提醒" className="card-wrap">
          <Button type="primary" onClick={()=>this.handleNot('success')}>Success</Button>
          <Button type="primary" onClick={()=>this.handleNot('error')}>Error</Button>
          <Button type="primary" onClick={()=>this.handleNot('info')}>Info</Button>
          <Button type="primary" onClick={()=>this.handleNot('warn')}>Warn</Button>
        </Card>
        <Card title="通知提醒" className="card-wrap">
          <Button type="primary" onClick={()=>this.handleNot('success', 'topLeft')}>Success</Button>
          <Button type="primary" onClick={()=>this.handleNot('error', 'topRight')}>Error</Button>
          <Button type="primary" onClick={()=>this.handleNot('info', 'bottomLeft')}>Info</Button>
          <Button type="primary" onClick={()=>this.handleNot('warn', 'bottomRight')}>Warn</Button>
        </Card>
      </div>
    )
  }
}
