import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import './index.less'

const { Item, SubMenu } = Menu
class NavLeft extends Component {
  state = {}
  renderMenu = (menu) => {
    return menu.map(item => {
      if (item.children) {
        return <SubMenu title={item.title} key={item.key}>
          {this.renderMenu(item.children)}
        </SubMenu>
      } else {
        return <Item key={item.key}>
          <Link to={item.key}>{item.title}</Link>
        </Item>
      }
    })
  }
  componentDidMount () {
    let currentKey = window.location.hash.replace(/^#|\?.*$/, '');
    // console.log(currentKey)
    this.setState({
      currentKey
    })
  }
  handleClick = ({item, key}) => {
    // console.log(item, key)
    this.setState({
      currentKey: key
    })
  }
  render() {
    return (
      <div className="nav-left">
        <div className="nav-top">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>单车</h1>
        </div>
        <Menu 
          theme="dark"
          selectedKeys={[this.state.currentKey]}
          onClick={this.handleClick}
        >
          {this.renderMenu(menuList)}
        </Menu>
      </div>
    )
  }
}

export default NavLeft