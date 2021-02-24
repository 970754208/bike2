import React, { Component } from 'react'
import { Button, Card, Form, Input, Select, Modal, message, Tree, Transfer } from 'antd'
import ETable from '@/components/ETable'
import axios from '@/axios'
import Utils from '@/utils'
import MenuConfig from '@/config/menuConfig'

const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode

export default class Permission extends Component {
  state = {
    isCreateShow: false,
    isSetShow: false,
    isUserShow: false
  }
  params = {}
  componentDidMount() {
    this.requestList();
  }
  requestList = () => {
    axios.requestList(this, '/permission/list', this.params)
  }

  dealChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedItem: selectedRows[0],
      menuInfo: selectedRows[0].menus
    })
  }

  handleClick = type => {
    if (type !== 'isCreateShow' && !this.state.selectedItem) {
      Modal.warn({
        title: '请至少选择一项'
      })
      return
    }
    this.setState({
      [type]: true
    })
  }

  // 用户授权显示
  handleUserShow = () => {
    if (!this.state.selectedItem) {
      Modal.warn({
        title: '请至少选择一项'
      })
      return
    }
    axios.ajax({
      url: '/permission/user_list',
      data: {
        params: {
          id: this.state.selectedItem.id
        }
      }
    }).then(res => {
      if (res.code === 0) {
        console.log(res)
        let dataSource = [],
          targetKeys = [];
        res.result.forEach(item => {
          let data = {
            title: item.user_name,
            key: item.user_id,
            status: item.status
          };
          dataSource.push(data);
          if (data.status === 1) {
            targetKeys.push(data.key)
          }
        })
        this.setState({
          isUserShow: true,
          userList: {
            targetKeys,
            dataSource
          }
        })
      }
    })
  }

  // 创建角色提交
  createSubmit = () => {
    // console.log(this.roleForm.props.form.getFieldsValue())
    axios.ajax({
      url: '/permission/create',
      data: {
        params: this.roleForm.props.form.getFieldsValue()
      }
    }).then(res => {
      if (res.code === 0) {
        message.success('创建角色成功')
        this.setState({ isCreateShow: false })
      }
    })
  }

  patchMenuInfo = (menuInfo) => {
    this.setState({
      menuInfo
    })
  }

  // 设置权限提交
  setSubmit = () => {
    let data = this.setForm.props.form.getFieldsValue();
    data.id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo
    axios.ajax({
      url: '/permission/setting',
      data: {
        params: data
      }
    }).then(res => {
      if (res.code === 0) {
        // console.log(res)
        message.success('设置成功')
        this.setState({
          isSetShow: false
        })
      }
    })
  }

  // 设置权限取消
  handleCancelSet = () => {
    // console.log(this.state.selectedItem.menus === this.state.menuInfo)
    this.setState({
      isSetShow: false,
      menuInfo: this.state.selectedItem.menus
    })
  }

  // 用户授权提交
  userSubmit = () => {
    const { selectedItem, userList } = this.state;
    let params = {};
    params.userId = selectedItem.id;
    params.ids = userList.targetKeys
    axios.ajax({
      url: '/permission/user_submit',
      data: {
        params
      }
    }).then(res => {
      // console.log(res)
      message.success('用户授权成功')
      this.setState({
        isUserShow: false,
        selectedRowKeys: [],
        selectedRows: [],
        selectedItem: null
      })
      this.requestList();
    })
  }

  setTargetKeys = (targetKeys) => {
    let { userList} = this.state;
    userList.targetKeys = targetKeys
    this.setState({
      userList
    })
  }

  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      }, {
        title: '角色名称',
        dataIndex: 'role_name'
      }, {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formateDate
      }, {
        title: '使用状态',
        dataIndex: 'status',
        render: status => status === 1 ? '启用' : '禁用'
      }, {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateDate
      }, {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }
    ]
    const { selectedRowKeys, selectedItem, dataSource, isCreateShow, isSetShow, isUserShow, menuInfo, userList } = this.state;
    return (
      <div>
        <Card>
          <Button type="primary" style={{ marginRight: 10, marginBottom: 20 }} onClick={() => this.handleClick('isCreateShow')}>创建角色</Button>
          <Button type="primary" style={{ marginRight: 10 }} onClick={() => this.handleClick('isSetShow')}>设置权限</Button>
          <Button type="primary" style={{ marginRight: 10 }} onClick={() => this.handleUserShow()}>用户授权</Button>
          <ETable
            columns={columns}
            selectedRowKeys={selectedRowKeys}
            dataSource={dataSource}
            dealChange={this.dealChange}
          />
        </Card>
        <Modal
          title="创建角色"
          visible={isCreateShow}
          onCancel={() => this.setState({ isCreateShow: false })}
          onOk={this.createSubmit}
        >
          <RoleForm wrappedComponentRef={info => this.roleForm = info} />
        </Modal>
        <Modal
          title="权限设置"
          visible={isSetShow}
          onCancel={this.handleCancelSet}
          onOk={this.setSubmit}
        >
          <SetForm
            menuInfo={menuInfo}
            patchMenuInfo={this.patchMenuInfo}
            selectedItem={selectedItem || []}
            wrappedComponentRef={info => this.setForm = info}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={isUserShow}
          onCancel={()=>this.setState({isUserShow: false})}
          onOk={this.userSubmit}
          width={800}
        >
          <UserForm
            selectedItem={selectedItem || {}}
            dataSource={userList && userList.dataSource}
            targetKeys={userList && userList.targetKeys}
            setTargetKeys={this.setTargetKeys}
            wrappedComponentRef={info=>this.userForm=info}
          />
        </Modal>
      </div>
    )
  }
}

class RoleForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <Form>
        <FormItem label="角色名称" {...layout}>
          {
            getFieldDecorator('roleName')(
              <Input placeholder="请输入角色名称" />
            )
          }
        </FormItem>
        <FormItem label="状态" {...layout}>
          {
            getFieldDecorator('status')(
              <Select>
                <Option value="1">开启</Option>
                <Option value="2">禁用</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
RoleForm = Form.create()(RoleForm)

class SetForm extends Component {

  renderTreeNodes = (menuConfig) => {
    return menuConfig.map(item => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      } else {
        return <TreeNode title={item.title} key={item.key} />
      }
    })
  }

  handleCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }

  render() {
    const { selectedItem, menuInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <div>
        <Form>
          <FormItem label="角色名称" {...layout}>
            {
              getFieldDecorator('roleName', {
                initialValue: selectedItem.role_name
              })(
                <Input disabled />
              )
            }
          </FormItem>
          <FormItem label="状态" {...layout}>
            {
              getFieldDecorator('status', {
                initialValue: selectedItem.status === 1 ? '开启' : '禁用'
              })(
                <Select>
                  <Option value="1">开启</Option>
                  <Option value="2">禁用</Option>
                </Select>
              )
            }
          </FormItem>
        </Form>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={menuInfo}
          onCheck={this.handleCheck}
        >
          <TreeNode title="平台权限" key="1">
            {this.renderTreeNodes(MenuConfig)}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}
SetForm = Form.create()(SetForm)

class UserForm extends Component {
  handleChange = (targetKeys, direction, moveKeys) => {
    // console.log(targetKeys, direction, moveKeys)
    this.props.setTargetKeys(targetKeys)
  }

  handleSearch = (direction, value) => {
    console.log(direction, value)
  }

  render() {
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const { selectedItem, dataSource, targetKeys } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <FormItem label="角色名称" {...layout}>
          {
            getFieldDecorator('role_name', {
              initialValue: selectedItem.role_name
            })(
              <Input disabled />
            )
          }
        </FormItem>
        <FormItem label="状态" {...layout}>
          {
            getFieldDecorator('status')(
              <Transfer
                dataSource={dataSource}
                targetKeys={targetKeys}
                listStyle={{width: 200, height: 400}}
                render={record => record.title}
                onChange={this.handleChange}
                showSearch
                onSearch={this.handleSearch}
                locale={{
                  searchPlaceholder: '请输入用户名',
                  // notFoundContent: '未找到'
                }}
              />
            )
          }
        </FormItem>
      </Form>
    )
  }
}
UserForm = Form.create()(UserForm)