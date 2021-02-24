import React, { Component } from 'react'
import { Card, Button, message, Table, Modal } from 'antd'
import axios from '@/axios'
import Utils from '@/utils'

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
    render: sex => sex === 1 ? '男' : '女'
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
const dataSource = [
  {
    key: 0,
    "id": 1,
    "userName": "龚明",
    "sex": 1,
    "state": 4,
    "hobbies": 2,
    "birthday": "2001-01-02",
    "address": "西藏自治区 拉萨市 尼木县",
    "time": "08:00"
  },
  {
    key: 1,
    "id": 2,
    "userName": "武秀兰",
    "sex": 1,
    "state": 3,
    "hobbies": 5,
    "birthday": "2001-01-02",
    "address": "辽宁省 抚顺市 新抚区",
    "time": "08:00"
  },
  {
    key: 2,
    "id": 3,
    "userName": "龚刚",
    "sex": 0,
    "state": 4,
    "hobbies": 6,
    "birthday": "2001-01-02",
    "address": "湖北省 襄阳市 宜城市",
    "time": "08:00"
  }
]

export default class Basic extends Component {
  state = {
    selectedRowKeys3: [],
    selectedItem: null,
    selectedRowKeys4: [],
    selectedRows4: [],
    pagination: {}
  }
  params = {
    page: 1
  }
  componentDidMount() {
    this.requestList()
  }
  requestList = () => {
    axios.ajax({
      url: '/table/list',
      data: {
        params: this.params
      }
    }).then(res => {
      // console.log(res)
      this.setState({
        dataSource2: res.result.list,
        pagination: Utils.pagination(res, current => {
          this.params.page = current;
          this.requestList()
        })
      })
    })
  }
  handleRowClick = (record, index) => {
    // console.log(record, index)
    this.setState({
      selectedRowKeys3: [record.key],
      selectedItem: record
    })
    message.success(`你选择了key为${record.key}的行`)
  }
  handleChange = (selectedRowKeys, selectedRows) => {
    // console.log(selectedRowKeys, selectedRows)
    this.setState({
      selectedRowKeys4: selectedRowKeys,
      selectedRows4: selectedRows
    })
  }
  handleRowClick4 = (record) => {
    let { selectedRowKeys4, selectedRows4 } = this.state;
    let index = selectedRowKeys4.indexOf(record.key);
    if (index === -1) {
      selectedRowKeys4.push(record.key);
      selectedRows4.push(record)
    } else {
      selectedRowKeys4.splice(index, 1);
      selectedRows4.splice(index, 1)
    }
    this.handleChange(selectedRowKeys4, selectedRows4)
  }
  handleDelete = () => {
    console.log(this.state.selectedRowKeys3)
    if (this.state.selectedRowKeys3[0] >= 0) {
      Modal.confirm({
        title: `确定删除${this.state.selectedItem.userName}吗?`,
        onOk: () => {
          this.requestList();
          message.success(`删除成功`)
          this.setState({
            selectedRowKeys3: [],
            selectedItem: null,
            selectedRowKeys4: [],
            selectedRows4: [],
            pagination: {}
          })
        }
      })
    } else {
      Modal.warn({
        title: '请至少选择一条'
      })
    }
  }
  render() {
    const { dataSource2, selectedRowKeys3, selectedRowKeys4, pagination } = this.state;
    const rowSelection3 = {
      type: 'radio',
      selectedRowKeys: selectedRowKeys3
    }
    const rowSelection4 = {
      type: 'checkbox',
      selectedRowKeys: selectedRowKeys4,
      onChange: (selectedRowKeys, selectedRows) => this.handleChange(selectedRowKeys, selectedRows)
    }
    return (
      <div>
        <Card title="基础表格" style={{ marginBottom: 20 }}>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
          />
        </Card>
        <Card title="mock-动态表格" style={{ marginBottom: 20 }}>
          <Table
            columns={columns}
            dataSource={dataSource2}
            pagination={false}
            bordered
          />
        </Card>
        <Card title="mock-单选" style={{ marginBottom: 20 }}>
          <Button type="primary" onClick={this.handleDelete} style={{ marginBottom: 10 }}>删除</Button>
          <Table
            columns={columns}
            dataSource={dataSource2}
            pagination={false}
            bordered
            rowSelection={rowSelection3}
            onRow={(record, index) => ({
              onClick: e => this.handleRowClick(record, index)
            })}
          />
        </Card>
        <Card title="mock-多选" style={{ marginBottom: 20 }}>
          <Table
            columns={columns}
            dataSource={dataSource2}
            pagination={false}
            bordered
            rowSelection={rowSelection4}
            onRow={(record, index) => ({
              onClick: e => this.handleRowClick4(record, index)
            })}
          />
        </Card>
        <Card title="mock-表格分页" style={{ marginBottom: 20 }}>
          <Table
            columns={columns}
            dataSource={dataSource2}
            bordered
            pagination={pagination}
          />
        </Card>
      </div>
    )
  }
}
