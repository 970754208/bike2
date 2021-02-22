import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import './ui.less'

export default class Messages extends Component {
  handleMessage = (type) => {
    message[type]('恭喜你，React进阶成功')
  }
  render() {
    return (
      <div>
        <Card title="全局message" className="card-wrap">
          <Button type="primary" onClick={()=>this.handleMessage('success')}>success</Button>
          <Button type="primary" onClick={()=>this.handleMessage('info')}>info</Button>
          <Button type="primary" onClick={()=>this.handleMessage('warn')}>warn</Button>
          <Button type="primary" onClick={()=>this.handleMessage('error')}>error</Button>
          <Button type="primary" onClick={()=>this.handleMessage('loading')}>loading</Button>
        </Card>
      </div>
    )
  }
}
