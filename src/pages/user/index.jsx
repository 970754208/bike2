import React, { Component } from 'react'
import { Button, Card, DatePicker, Form, Input, message, Modal, Radio, Select } from 'antd'
import moment from 'moment'
import BaseForm from '@/components/BaseForm'
import ETable from '@/components/ETable'
import axios from '@/axios'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea

export default class User extends Component {
  state = {
    userShow: false
  }
  params = {}

  filterSubmit = (params) => {
    this.params = params;
    this.requestList();
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    axios.requestList(this, '/user', this.params)
  }

  dealChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedItem: selectedRows[0]
    })
  }

  // 员工操作
  userOperate = (type) => {
    if (type !== 'create' && !this.state.selectedItem) {
      Modal.warn({
        title: '请选择一名用户进行操作'
      })
      return;
    }
    this.setState({
      type,
      userShow: true
    })
  }

  // 删除员工
  delUser = () => {
    if (!this.state.selectedItem) {
      Modal.warn({
        title: '请选择一名用户进行操作'
      })
      return;
    }
    const { selectedItem } = this.state;
    Modal.confirm({
      title: '删除员工',
      content: `确定要删除${selectedItem.userName}吗？`,
      onOk: ()=>this.handleDelSubmit(selectedItem)
    })
  }

  // 删除员工提交
  handleDelSubmit = (selectedItem) => {
    axios.ajax({
      url: '/user/delete',
      data: {
        params: selectedItem
      }
    }).then(res => {
      if (res.code === 0) {
        message.success('删除成功')
        this.setState({
          userShow: false,
          selectedRowKeys: [],
          selectedItem: null
        })
        this.requestList()
      }
    })
  }

  handleSubmit = () => {
    const { type } = this.state;
    axios.ajax({
      url: type === 'create' ? '/user/add' : '/user/edit',
      data: {
        params: this.userForm.props.form.getFieldsValue()
      }
    }).then(res => {
      if (res.code === 0) {
        // console.log(res)
        this.setState({
          userShow: false,
          selectedRowKeys: [],
          selectedItem: null
        })
        message.success('操作成功')
        this.requestList()
      }
    })
  }

  render() {
    const formList = [
      {
        type: "INPUT",
        label: "用户名",
        field: 'userName',
        placeholder: '请输入用户名'
      }, {
        type: "INPUT",
        label: "用户手机",
        field: 'telephone',
        placeholder: '请输入用户手机'
      }, {
        type: 'DATE',
        label: '入职日期',
        field: 'date',
        placeholder: '请输入入职日期'
      }
    ]
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render: sex => sex === 1 ? '男' : '女',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render: state => {
          const config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'hobbies',
        render: hobbies => {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸'
          };
          return config[hobbies];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ];
    const { dataSource, selectedRowKeys, userShow, type, selectedItem } = this.state;
    const title = {
      'create': '创建员工',
      'edit': '编辑员工',
      'detail': '员工详情',
      'delete': '删除员工'
    }
    const footer = type === 'detail' ? {footer: null} : null
    return (
      <div>
        <Card style={{ marginBottom: 20 }}>
          <BaseForm formList={formList} filterSubmit={this.filterSubmit} />
        </Card>
        <Card>
          <Button type="primary" icon="plus" style={{ marginRight: 10, marginBottom: 20 }} onClick={()=>this.userOperate('create')}>创建员工</Button>
          <Button type="primary" icon="etid" style={{ marginRight: 10 }} onClick={()=>this.userOperate('edit')}>编辑员工</Button>
          <Button type="primary" style={{ marginRight: 10 }} onClick={()=>this.userOperate('detail')}>员工详情</Button>
          <Button type="primary" icon="delete" onClick={()=>this.delUser()}>删除员工</Button>
          <ETable
            columns={columns}
            dataSource={dataSource}
            selectedRowKeys={selectedRowKeys}
            dealChange={this.dealChange}
          />
        </Card>
        <Modal
          title={title[type]}
          visible={userShow}
          onCancel={()=>this.setState({userShow: false})}
          onOk={()=>this.handleSubmit()}
          {...footer}
        >
          <UserForm 
            wrappedComponentRef={info => this.userForm=info} 
            type={type}
            selectedItem={selectedItem}
          />
        </Modal>
      </div>
    )
  }
}

class UserForm extends Component {
  render () {
    const layout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    let  { type, selectedItem } = this.props;
    const { getFieldDecorator } = this.props.form;
    selectedItem = selectedItem || []
    const state = {
      '1': '咸鱼一条',
      '2': '风华浪子',
      '3': '北大才子',
      '4': '百度FE',
      '5': '创业者'
    }
    return (
      <Form>
        <FormItem label="用户名" {...layout}>
          {
            type === 'detail'
            ? selectedItem.userName
            : getFieldDecorator('userName', {
              initialValue: type === 'edit' ? selectedItem.userName : null
            })(
              <Input placeholder="请输入用户名" />
            )
          }
        </FormItem>
        <FormItem label="性别" {...layout}>
          {
            type === 'detail'
            ? (selectedItem.sex === 1 ? '男' : '女')
            : getFieldDecorator('sex', {
              initialValue: type === 'edit' ? selectedItem.sex : null
            })(
              <RadioGroup>
                <Radio value="1">男</Radio>
                <Radio value="0">女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态" {...layout}>
          {
            type === 'detail'
            ? state[selectedItem.state]
            : getFieldDecorator('status', {
              initialValue: type === 'edit' ? selectedItem.state : null
            })(
              <Select>
                <Option value="1">咸鱼一条</Option>
                <Option value="2">风华浪子</Option>
                <Option value="3">北大才子</Option>
                <Option value="4">百度FE</Option>
                <Option value="5">创业者</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日" {...layout}>
          {
            type === 'detail'
            ? selectedItem.birthday
            : getFieldDecorator('birthday', {
              initialValue: type === 'edit' ? moment(selectedItem.birthday) : null
            })(
              <DatePicker />
            )
          }
        </FormItem>
        <FormItem label="联系地址" {...layout}>
          {
            type === 'detail'
            ? selectedItem.address
            : getFieldDecorator('address', {
              initialValue: type === 'edit' ? selectedItem.address : null
            })(
              <TextArea placeholder="请输入地址" autoSize={{maxRows: 3, minRows: 2}} />
            )
          }
        </FormItem>
      </Form>
    )
  }
}
UserForm = Form.create()(UserForm)