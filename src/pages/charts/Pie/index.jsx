import React, { Component } from 'react'
import { Card } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import echartTheme from '../echartTheme.js'

import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default class Bar extends Component {
  componentWillMount () {
    echarts.registerTheme('Imooc', echartTheme)
  }
  getOptions1 = () => {
    return {
      title: {
        text: '饼图之一',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br />{b}:{c}({d}%)'
      },
      legend: {
        orient: 'vertical',
        top: 10,
        right: 20
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          // radius: '60%',
          data: [
            { value: 2132, name: '周一'},
            { value: 123, name: '周二'},
            { value: 423, name: '周三'},
            { value: 1232, name: '周四'},
            { value: 4321, name: '周五'},
            { value: 2343, name: '周六'},
            { value: 3122, name: '周日'},
          ]
        }
      ]
    }
  }
  getOptions2 = () => {
    return {
      title: {
        text: '饼图之一',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br />{b}:{c}({d}%)'
      },
      legend: {
        orient: 'vertical',
        top: 10,
        right: 20
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'],
          data: [
            { value: 2132, name: '周一'},
            { value: 123, name: '周二'},
            { value: 423, name: '周三'},
            { value: 1232, name: '周四'},
            { value: 4321, name: '周五'},
            { value: 2343, name: '周六'},
            { value: 3122, name: '周日'},
          ]
        }
      ]
    }
  }
  
  getOptions3 = () => {
    return {
      title: {
        text: '饼图之三',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br />{b}:{c}({d}%)'
      },
      legend: {
        orient: 'vertical',
        top: 10,
        right: 20
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          roseType: true,
          data: [
            { value: 2132, name: '周一'},
            { value: 123, name: '周二'},
            { value: 423, name: '周三'},
            { value: 1232, name: '周四'},
            { value: 4321, name: '周五'},
            { value: 2343, name: '周六'},
            { value: 3122, name: '周日'},
          ].sort((a,b)=>a.value-b.value)
        }
      ]
    }
  }
  render() {
    return (
      <div>
        <Card title="饼图之一" style={{marginBottom: 20}}>
          <ReactEcharts
            option={this.getOptions1()}
            style={{ height: 500 }}
            theme="Imooc"
          />
        </Card>
        <Card title="饼图之二" style={{marginBottom: 20}}>
          <ReactEcharts
            option={this.getOptions2()}
            style={{ height: 500 }}
            theme="Imooc"
          />
        </Card>
        <Card title="饼图之三" style={{marginBottom: 20}}>
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
