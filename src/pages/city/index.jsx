import React, { Component } from 'react'
import { Card, Form, Select, Table, Button, Modal, message } from 'antd'
import axios from '@/axios'
import Utils from '@/utils'
import BaseForm from '@/components/BaseForm'
import ETable from '@/components/ETable'

const Option = Select.Option
const FormItem = Form.Item

export default class City extends Component {
  state = {
    selectedRowKeys: []
  }
  params = { page: 1 }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/open_city', this.params)
  }

  filterSubmit = (params) => {
    this.params = params;
    this.requestList();
  }

  handleOpen = () => {
    // console.log(this.cityForm)
    const { getFieldsValue } = this.cityForm.props.form;
    this.setState({
      showOpen: false
    })
    axios.ajax({
      url: '/city/open',
      data: {
        params: {
          ...getFieldsValue()
        }
      }
    }).then(res => {
      // console.log(res)
      if (res.code === 0) {
        message.success(res.result.msg)
        this.requestList()
      }
    })
  }

  // 传递给 ETable 的回调函数
  dealChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    })
  }

  render() {
    const columns = [{
      title: '城市ID',
      dataIndex: 'id'
    }, {
      title: '城市名称',
      dataIndex: 'name'
    }, {
      title: '用车模式',
      dataIndex: 'mode',
      render: (mode) => {
        return mode === 1 ? '指定停车点模式' : '禁停区模式'
      }

    }, {
      title: '营运模式',
      dataIndex: 'op_mode',
      render: (op_mode) => {
        return op_mode === 1 ? '自营' : '加盟'
      }

    }, {
      title: '授权加盟商',
      dataIndex: 'franchisee_name'
    }, {
      title: '城市管理员',
      dataIndex: 'city_admins',
      render: arr => {
        return arr.map(item => {
          return item.user_name
        }).join('，')
      }
    }, {
      title: '城市开通时间',
      dataIndex: 'open_time'
    }, {
      title: '操作时间',
      dataIndex: 'update_time',
      render: (time) => {
        return Utils.formateDate(time);
      }
    }, {
      title: '操作人',
      dataIndex: 'sys_user_name'
    }];
    const formList = [
      {
        type: 'SELECT',
        field: 'city',
        width: 100,
        label: '城市',
        placeholder: '全部',
        options: [
          {
            title: '北京市',
            value: '1'
          }, {
            title: '杭州市',
            value: '2'
          }, {
            title: '天津市',
            value: '3'
          }
        ]
      }, {
        type: 'SELECT',
        field: 'bike_mode',
        width: 150,
        label: '用车模式',
        options: [
          {
            title: '指定停车点模式',
            value: '1'
          }, {
            title: '禁停区模式',
            value: '2'
          }
        ]
      }, {
        type: 'SELECT',
        field: 'opr_mode',
        width: 100,
        label: '营运模式',
        options: [
          {
            title: '自营',
            value: '1'
          }, {
            title: '加盟',
            value: '2'
          }
        ]
      }, {
        type: 'SELECT',
        field: 'licence',
        width: 100,
        label: '加盟授权模式',
        options: [
          {
            title: '已授权',
            value: '1'
          }, {
            title: '未授权',
            value: '2'
          }
        ]
      }
    ]
    return (
      <div>
        <Card style={{ marginBottom: 20 }}>
          <BaseForm
            formList={formList}
            filterSubmit={this.filterSubmit}
          />
        </Card>
        <Card>
          <Button type="primary" style={{ marginBottom: 20 }} onClick={() => this.setState({ showOpen: true })}>开通城市</Button>
          <ETable
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            selectedRowKeys={this.state.selectedRowKeys}
            selectedRows={this.state.selectedRows}
            dealChange={this.dealChange}
            type={false}
          />
        </Card>
        <Modal
          title="开通城市"
          visible={this.state.showOpen}
          onCancel={() => this.setState({ showOpen: false })}
          onOk={this.handleOpen}
        >
          <OpenCity wrappedComponentRef={info => this.cityForm = info} />
        </Modal>
      </div>
    )
  }
}

class FilterForm extends Component {
  render() {
    return (
      <Form layout="inline" >
        <FormItem label="城市">
          <Select value="1">
            <Option key="0">全部</Option>
            <Option key="1" value="1">北京市</Option>
            <Option key="2" value="2">天津市</Option>
            <Option key="3" value="3">保定市</Option>
          </Select>
        </FormItem>
        <FormItem label="用车模式">
          <Select value="1">
            <Option key="0">全部</Option>
            <Option key="1" value="1">指定停单点模式</Option>
            <Option key="2" value="2">禁停区模式</Option>
          </Select>
        </FormItem>
        <FormItem label="营运模式">
          <Select value="1">
            <Option key="0">全部</Option>
            <Option key="1" value="1">自营</Option>
            <Option key="2" value="2">加盟</Option>
          </Select>
        </FormItem>
        <FormItem label="加盟商授权模式">
          <Select value="1">
            <Option key="0">全部</Option>
            <Option key="1" value="1">已授权</Option>
            <Option key="2" value="2">未授权</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ marginRight: 20 }}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form >
    )
  }
}
FilterForm = Form.create()(FilterForm)

class OpenCity extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const layoutFormat = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    return (
      <Form layout="horizontal">
        <FormItem label="城市" {...layoutFormat} required>
          {
            getFieldDecorator('city', {
              roles: [
                {
                  required: true
                }
              ],
            })(
              <Select style={{ width: 200 }}>
                <Option key="0" value="">全部</Option>
                <Option key="1" value="1">北京市</Option>
                <Option key="2" value="2">天津市</Option>
                <Option key="3" value="3">杭州市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="营运模式" {...layoutFormat} required>
          {
            getFieldDecorator('opr_mode', {
              roles: [
                {
                  required: true
                }
              ],
            })(
              <Select style={{ width: 200 }}>
                <Option key="0">全部</Option>
                <Option key="1" value="1">自营</Option>
                <Option key="2" value="2">加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式" {...layoutFormat} required>
          {
            getFieldDecorator('bike_mode', {
              roles: [
                {
                  required: true
                }
              ],
            })(
              <Select style={{ width: 200 }}>
                <Option key="0">全部</Option>
                <Option key="1" value="1">指定停车点模式</Option>
                <Option key="2" value="2">禁停区模式</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
OpenCity = Form.create()(OpenCity)