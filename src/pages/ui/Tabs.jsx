import React, { Component } from 'react'
import { Card, message, Button, Tabs } from 'antd'
import './ui.less'

const { TabPane } = Tabs

export default class ITabs extends Component {
  tabChange = (key) => {
    message.success(`成功切换到tab${key}`)
  }
  onChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }
  onEdit = (targetKey, action) => {
    if (action === 'remove') {
      this.removePane(targetKey)
    } else {
      this.addPane()
    }
    // console.log(targetKey, action)
  }
  removePane = (targetKey) => {
    let { activeKey, panes } = this.state;
    let targetIndex;
    panes.forEach((item, index) => {
      if (item.key === targetKey) {
        targetIndex = index;
      }
    })
    panes.splice(targetIndex, 1);
    if (targetKey === activeKey) {
      if (targetIndex > 0) {
        activeKey = panes[targetIndex - 1].key;
      } else {
        activeKey = panes[0] && panes[0].key
      }
    }
    this.setState({
      activeKey,
      panes
    })
  }
  addPane = () => {
    let { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex}`;
    panes.push({
      title: `newTab ${this.newTabIndex}`,
      content: `new Content ${this.newTabIndex}`,
      key: activeKey
    })
    this.newTabIndex++
    this.setState({
      activeKey,
      panes
    })
  }
  state = {
    activeKey: '1',
    panes: [
      { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab Pane 2', key: '3' },
    ]
  }
  newTabIndex = 0
  renderPanes = () => {
    let { panes } = this.state;
    return panes.map(item => {
      return <TabPane tab={item.title} key={item.key}>
        {item.content}
      </TabPane>
    })
  }
  render() {
    return (
      <div>
        <Card title="页签" className="card-wrap">
          <Tabs defaultActiveKey="2" onChange={this.tabChange}>
            <TabPane tab="tab 1" key="1">
              content1
            </TabPane>
            <TabPane tab="tab 2" key="2">
              content2
            </TabPane>
            <TabPane tab="tab 3" key="3">
              content3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="页签" className="card-wrap">
          <Tabs 
            defaultActiveKey="2" 
            onChange={this.tabChange} 
            tabPosition="bottom"
            animated={true}
            type="card"
            tabBarExtraContent={<Button>额外按钮</Button>}
          >
            <TabPane tab="tab 1" key="1">
              content1
            </TabPane>
            <TabPane tab="tab 2" key="2" disabled>
              content2
            </TabPane>
            <TabPane tab="tab 3" key="3">
              content3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="新增和关闭页签" className="card-wrap">
          <Tabs 
            type="editable-card"
            onChange={this.onChange}
            onEdit={this.onEdit}
            activeKey={this.state.activeKey}
          >
            {this.renderPanes()}
          </Tabs>
        </Card>
      </div>
    )
  }
}
