import React, { Component } from 'react'
import { Card, Button, Icon, Radio } from 'antd'
import './ui.less'

const ButtonGroup = Button.Group
const RadioGroup = Radio.Group

export default class Buttons extends Component {
  state = {
    loading: true,
    value: 'large'
  }
  handleLoading = (loading) => {
    this.setState({
      loading
    })
  }
  changeSize = e => {
    // console.log(e.target.value)
    this.setState({
      value: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Card title="基础按钮" className="card-wrap">
          <Button type="primary">Imooc</Button>
          <Button>Imooc</Button>
          <Button type="dashed">Imooc</Button>
          <Button type="danger">Imooc</Button>
          <Button type="link">Imooc</Button>
          <Button type="primary" disabled>Imooc</Button>
        </Card>
        <Card title="带icon按钮" className="card-wrap">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button icon="search" shape="circle"></Button>
          <Button icon="search">搜索</Button>
        </Card>
        <Card title="loading" className="card-wrap">
          <Button onClick={() => this.handleLoading(true)} loading={this.state.loading}>确定</Button>
          <Button onClick={() => this.handleLoading(true)} loading={this.state.loading} shape="circle"></Button>
          <Button onClick={() => this.handleLoading(true)} loading={this.state.loading}>点击加载</Button>
          <Button onClick={() => this.handleLoading(false)} type="primary">关闭</Button>
        </Card>
        <Card title="按钮组" style={{marginBottom: 20}}>
          <ButtonGroup>
            <Button icon="left">返回</Button>
            <Button>前进 <Icon type="right"></Icon></Button>
          </ButtonGroup>
        </Card>
        <Card title="按钮尺寸" className="card-wrap">
          <RadioGroup onChange={this.changeSize} value={this.state.value}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </RadioGroup>
          <Button type="primary" size={this.state.value}>Imooc</Button>
          <Button size={this.state.value}>Imooc</Button>
          <Button type="dashed" size={this.state.value}>Imooc</Button>
        </Card>
      </div>
    )
  }
}
