import React, { Component } from 'react'
import { Button, Card, Form, message, Modal } from 'antd'
import BaseForm from '@/components/BaseForm'
import ETable from '@/components/ETable'
import axios from '@/axios'
import Utils from '@/utils'

const FormItem = Form.Item

export default class Order extends Component {
  state = {
    selectedRowKeys: [],
    selectedRows: [],
    detailShow: false
  }

  params = {}

  filterSubmit = params => {
    this.param = params;
    this.requestList();
  }

  requestList = () => {
    axios.requestList(this, '/order/list', this.params)
  }

  componentDidMount() {
    this.requestList();
  }

  dealChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRows
    })
  }

  // 订单详情
  orderDetail = () => {
    const { selectedRowKeys, selectedRows } = this.state;
    if (selectedRowKeys.length !== 1) {
      Modal.error({
        title: '请选择一个订单'
      })
      return;
    }
    window.open('/#/common/order/detail/'+selectedRows[0].id, 'target=_blank')
  }

  // 结束订单
  endOrder = () => {
    const { selectedRowKeys, selectedRows } = this.state;
    if (selectedRowKeys.length !== 1) {
      Modal.error({
        title: '请选择一个订单'
      })
      return;
    }
    axios.ajax({
      url: '/order/ebike_info',
      data: {
        params: {
          id: selectedRows[0].id
        }
      }
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          detailInfo: res.result,
          detailShow: true
        })
      }
    })
  }

  // 结束订单提交
  handleEnd = () => {
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: {
          id: this.state.selectedRows[0].id
        }
      }
    }).then(res => {
      if (res.code === 0) {
        message.success(res.result.msg);
        this.setState({
          detailShow: false,
          detailInfo: {},
          selectedRowKeys: [],
          selectedRows: []
        })
        this.requestList()
      }
    })
  }

  render() {
    const formList = [
      {
        type: "SELECT",
        label: '城市',
        field: 'city',
        width: 100,
        options: [
          {
            title: '北京市',
            value: '1'
          }, {
            title: '保定市',
            value: '2',
          }, {
            title: '杭州市',
            value: '3'
          }
        ]
      }, {
        type: '起止时间',
        field: 'orderTime',
        label: '订单时间'
      }, {
        type: 'SELECT',
        field: 'status',
        label: '订单状态',
        width: 100,
        options: [
          {
            title: '进行中',
            value: '1'
          }, {
            title: '已结束',
            value: '2'
          }
        ]
      }
    ]
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render: distance => {
          return distance / 1000 + 'km'
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time',
        render: time => {
          let h = Math.floor(time / 60);
          let m = time % 60;
          return `${h}小时${m}分`
        }
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: status => {
          return status === 1 ? '进行中' : '已结束'
        }
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ]
    const { dataSource, selectedRowKeys, selectedRows } = this.state;
    return (
      <div>
        <Card style={{ marginBottom: 20 }}>
          <BaseForm
            formList={formList}
            filterSubmit={this.filterSubmit}
          />
        </Card>
        <Card>
          <Button type="primary" style={{marginRight: 10, marginBottom: 20}} onClick={this.orderDetail}>订单详情</Button>
          <Button type="primary" onClick={this.endOrder}>结束订单</Button>
          <ETable
            columns={columns}
            dataSource={dataSource}
            selectedRowKeys={selectedRowKeys}
            selectedRows={selectedRows}
            dealChange={this.dealChange}
          />
        </Card>
        <Modal
          title="结束订单"
          onCancel={()=>this.setState({detailShow: false})}
          onOk={this.handleEnd}
          visible={this.state.detailShow}
        >
          <EndDetail detailInfo={this.state.detailInfo} />
        </Modal>
      </div>
    )
  }
}

class EndDetail extends Component {
  render () {
    const { detailInfo } = this.props;
    const layout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }
    return (
      <Form>
        <FormItem label="车辆编号" {...layout}>
          {detailInfo.id}
        </FormItem>
        <FormItem label="车辆电量" {...layout}>
          {detailInfo.battery + '%'}
        </FormItem>
        <FormItem label="行程开始时间" {...layout}>
          {detailInfo.start_time}
        </FormItem>
        <FormItem label="当前位置" {...layout}>
          {detailInfo.location}
        </FormItem>
      </Form>
    )
  }
}