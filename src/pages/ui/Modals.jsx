import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'

export default class Modals extends Component {
  state = {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false
  }
  handleMethod = (type) => {
    Modal[type]({
      title: '信息确认框',
      content: '这是一个小的信息确认框'
    })
  }
  render() {
    return (
      <div>
        <Card title="基础模态框" className="card-wrap">
          <Button type="primary" onClick={()=>this.setState({visible1: true})}>Open</Button>
          <Button type="primary" onClick={()=>this.setState({visible2: true})}>自定义页脚</Button>
          <Button type="primary" onClick={()=>this.setState({visible3: true})}>顶部20px弹框</Button>
          <Button type="primary" onClick={()=>this.setState({visible4: true})}>水平垂直居中</Button>
        </Card>
        <Card title="基础模态框" className="card-wrap">
          <Button type="primary" onClick={()=>this.handleMethod('confirm')}>Confirm</Button>
          <Button type="primary" onClick={()=>this.handleMethod('info')}>Info</Button>
          <Button type="primary" onClick={()=>this.handleMethod('success')}>Success</Button>
          <Button type="primary" onClick={()=>this.handleMethod('error')}>Error</Button>
          <Button type="primary" onClick={()=>this.handleMethod('warning')}>Wraning</Button>
        </Card>
        <Modal
          title="base Modal 1"
          visible={this.state.visible1}
          onCancel={()=>this.setState({visible1: false})}
        >
          <p>欢迎进入Modal模态框!!!</p>
        </Modal>
        <Modal
          title="base Modal 2"
          visible={this.state.visible2}
          onCancel={()=>this.setState({visible2: false})}
          okText="好的"
          cancelText="算了"
        >
          <p>欢迎进入Modal模态框!!!</p>
        </Modal>
        <Modal
          title="base Modal 3"
          style={{top: 20}}
          visible={this.state.visible3}
          onCancel={()=>this.setState({visible3: false})}
        >
          <p>欢迎进入Modal模态框!!!</p>
        </Modal>
        <Modal
          title="base Modal 4"
          visible={this.state.visible4}
          onCancel={()=>this.setState({visible4: false})}
          centered
        >
          <p>欢迎进入Modal模态框!!!</p>
        </Modal>
      </div>
    )
  }
}
