import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import echartTheme from '../echartTheme.js'

import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default class Bar extends Component {
  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme)
  }
  getOptions1 = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪衬衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [500, 2000, 1002, 3200, 6005, 1002]
        }
      ]
    }
  }
  getOptions2 = () => {
    return {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data: [2000, 3000, 4000, 6000, 8000, 9000, 12000]
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [1800, 2500, 3500, 5400, 6800, 8000, 11000]
        },
        {
          name: '小蓝',
          type: 'bar',
          data: [1500, 1800, 2000, 3000, 6000, 8000, 9000]
        },
      ]
    }
  }
  render() {
    return (
      <div>
        <Card title="柱形图表之一" style={{marginBottom: 20}}>
          <ReactEcharts
            option={this.getOptions1()}
            style={{ height: 500 }}
            theme="Imooc"
          />
        </Card>
        <Card title="柱形图表之二">
          <ReactEcharts
            option={this.getOptions2()}
            style={{ height: 500 }}
            theme="Imooc"
          />
        </Card>
      </div>
    )
  }
}
