import React, { Component } from 'react'
import { Card, Button, Badge, Table, Modal } from 'antd'
import axios from '@/axios'

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

const columns2 = [
  {
    title: 'id',
    dataIndex: 'id',
    fixed: 'left',
    width: 100
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    fixed: 'left',
    width: 100
  },
  {
    title: '性别',
    dataIndex: 'sex',
    render: sex => sex === 1 ? '男' : '女',
    fixed: 'left',
    width: 100
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
    title: '生日',
    dataIndex: 'birthday'
  },
  {
    title: '地址',
    dataIndex: 'address'
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
    title: '生日',
    dataIndex: 'birthday'
  },
  {
    title: '地址',
    dataIndex: 'address'
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
    title: '生日',
    dataIndex: 'birthday'
  },
  {
    title: '地址',
    dataIndex: 'address'
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
    title: '生日',
    dataIndex: 'birthday'
  },
  {
    title: '地址',
    dataIndex: 'address',
    fixed: 'right'
  },
  {
    title: '早起时间',
    dataIndex: 'time',
    fixed: 'right'
  }
].map((item, index) => {
  item.key = index;
  return item;
});

export default class Basic extends Component {
  state = {
    dataSource: null,
  }
  params = {
    page: 1
  }
  componentDidMount() {
    this.requestList()
  }
  requestList = () => {
    axios.ajax({
      url: '/table/high/list',
      data: {
        params: this.params
      }
    }).then(res => {
      // console.log(res)
      this.setState({
        dataSource: res.result.list.map((item, index) => {
          item.key = index;
          return item
        })
      })
    })
  }

  handleDel = item => {
    Modal.confirm({
      title: `确定要删除id为${item.id}的item吗`,
      onOk: () => {
        this.requestList()
      }
    })
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      sortOrder: sorter.order
    })
  }
  
  render() {
    const dataSource2 = [
      {
        key: 1,
        "id": 1,
        "userName": "林芳",
        "sex": 1,
        "state": 3,
        "hobbies": 8,
        "age": 23,
        "birthday": "2001-01-02",
        "address": "内蒙古自治区 鄂尔多斯市 其它区",
        "time": "08:00"
      },
      {
        key: 2,
        "id": 2,
        "userName": "林丽",
        "sex": 0,
        "state": 3,
        "hobbies": 4,
        "age": 35,
        "birthday": "2001-01-02",
        "address": "河南省 周口市 项城市",
        "time": "08:00"
      },
      {
        key: 3,
        "id": 3,
        "userName": "郑刚",
        "sex": 1,
        "state": 3,
        "hobbies": 1,
        "age": 40,
        "birthday": "2001-01-02",
        "address": "浙江省 衢州市 常山县",
        "time": "08:00"
      }
    ]
    
    const columns3 = [
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
          const badge = {
            '1': 'success',
            '2': 'error',
            '3': 'default',
            '4': 'processing',
            '5': 'warning',
          }
          return <Badge status={badge[state]} text={config[state]} />
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
        title: '年龄',
        dataIndex: 'age',
        sorter:(a,b) => a.age - b.age,
        sortOrder: this.state.sortOrder
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      },
      {
        title: '删除',
        dataIndex: 'delete',
        render: (index, item) => {
          return <Button type="primary" size="small" onClick={() => this.handleDel(item)}>删除</Button>
        }
      }
    ];
    const { dataSource } = this.state;
    return (
      <div>
        <Card title="头部固定" style={{ marginBottom: 20 }}>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
            scroll={{y: 300}}
          />
        </Card>
        <Card title="左侧固定" style={{ marginBottom: 20 }}>
          <Table
            columns={columns2}
            dataSource={dataSource2}
            pagination={false}
            bordered
            scroll={{x: 3300}}
          />
        </Card>
        <Card title="表格排序&amp;操作按钮" style={{ marginBottom: 20 }}>
          <Table
            columns={columns3}
            dataSource={dataSource}
            pagination={false}
            bordered
            onChange={(pagination, filters, sorter, d) => {
              // console.log(pagination, filters, sorter, d)
              this.handleChange(pagination, filters, sorter)
            }}
          />
        </Card>
      </div>
    )
  }
}
