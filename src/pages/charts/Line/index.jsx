import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import echartTheme from '../themeDark.js'

// import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'


export default class Bar extends Component {
  componentWillMount () {
    echarts.registerTheme('Imooc', echartTheme)
  }
  getOptions1 = () => {
    return {
      title: {
        text: '折线图一'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {},
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [2000, 3000, 4000, 6000, 8000, 9000, 12000] 
        }
      ]
    }
  }
  getOptions2 = () => {
    return {
      title: {
        text: '折线图二'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {},
      series: [
        {
          name: 'OFO订单量',
          type: 'line',
          data: [2000, 3000, 4000, 6000, 8000, 9000, 12000] 
        }, {
          name: '摩拜订单量',
          type: 'line',
          data: [3000, 5000, 6000, 8000, 9000, 10000, 14000] 
        }
      ]
    }
  }
  getOptions3 = () => {
    return {
      title: {
        text: '折线图二三'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        boundaryGap: false
      },
      yAxis: {},
      series: [
        {
          name: 'OFO订单量',
          type: 'line',
          data: [2000, 3000, 8000, 4000, 6000, 12000, 6000] ,
          areaStyle: {}
        }
      ]
    }
  }
  render() {
    return (
      <div>
        <Card title="折线图之一" style={{marginBottom: 20}}>
          <ReactEcharts
            option={this.getOptions1()}
            style={{ height: 500 }}
            theme="Imooc"
          />
        </Card>
        <Card title="折线图之二" style={{marginBottom: 20}}>
          <ReactEcharts
            option={this.getOptions2()}
            style={{ height: 500 }}
            theme="Imooc"
          />
        </Card>
        <Card title="折线图之三" style={{marginBottom: 20}}>
          <ReactEcharts
            option={this.getOptions3()}
            style={{ height: 500 }}
            theme="Imooc"
          />
        </Card>
      </div>
    )
  }
}
