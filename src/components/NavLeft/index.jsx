import React, { Component } from 'react'
import { Menu } from 'antd'
import menuList from '../../config/menuConfig'
import './index.less'

const { Item, SubMenu } = Menu

export default class NavLeft extends Component {
  renderMenu = (menu) => {
    return menu.map(item => {
      if (item.children) {
        return <SubMenu title={item.title} key={item.key}>
          {this.renderMenu(item.children)}
        </SubMenu>
      } else {
        return <Item key={item.key}>{item.title}</Item>
      }
    })
  }
  render() {
    return (
      <div className="nav-left">
        <div className="nav-top">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>单车</h1>
        </div>
        <Menu theme="dark">
          {this.renderMenu(menuList)}
        </Menu>
      </div>
    )
  }
}
