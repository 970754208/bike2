import React, { Component } from 'react'
import { Card } from 'antd'
import BaseForm from '@/components/BaseForm'
import axios from '@/axios'

export default class BikeMap extends Component {
  state = {}
  params = {}
  filterSubmit = params => {
    this.params = params;
    this.requestList();
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.ajax({
      url: '/map/bikeMap',
      data: {
        params: this.params
      }
    }).then(res => {
      if (res.code === 0) {
        // console.log(res)
        this.setState({
          total_count: res.result.total_count
        })
        this.renderMap(res.result)
      }
    })
  }

  // 绘制地图
  renderMap = res => {
    let BMap = window.BMap;
    this.map = new BMap.Map('bikeMap')
    this.addControls();
    this.renderArea(res.service_list)
    this.renderRoute(res.route_list)
    this.renderBikes(res.bike_list)
  }

  // 添加控件
  addControls = () => {
    let map = this.map,
      BMap = window.BMap;
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用   
  }

  // 绘制路线图
  renderRoute = (route_list) => {
    const routeList = [],
      BMap = window.BMap,
      map = this.map;

    // 起点和终点
    let start_point = route_list[0].split(','),
      end_point = route_list[route_list.length-1].split(','),
      startPoint = new BMap.Point(start_point[0], start_point[1]),
      endPoint = new BMap.Point(end_point[0], end_point[1]),
      startIcon = new BMap.Icon('/assets/start_point.png', new BMap.Size(36, 42), {
        anchor: new BMap.Size(18, 42),
        imageSize: new BMap.Size(36, 42)
      }),
      endIcon = new BMap.Icon('/assets/end_point.png', new BMap.Size(36, 42), {
        anchor: new BMap.Size(18, 42),
        imageSize: new BMap.Size(36, 42)
      }),
      startMarker = new BMap.Marker(startPoint, {icon: startIcon}),
      endMarker = new BMap.Marker(endPoint, {icon: endIcon});
    map.centerAndZoom(endPoint, 12);
    map.addOverlay(startMarker);
    map.addOverlay(endMarker);

    // 路线图
    route_list.forEach(item => {
      let location = item.split(',');
      routeList.push(new BMap.Point(location[0], location[1]))
    })
    let polyline = new BMap.Polyline(routeList, {
      strokeColor: '#09f',
      strokeWeight: 6
    })
    map.addOverlay(polyline)
  }

  // 绘制禁停区 
  renderArea = (service_list) => {
    const map = this.map,
      BMap = window.BMap,
      serviceList = [];
    service_list.forEach(item => {
      serviceList.push(new BMap.Point(item.lon, item.lat))
    })
    let polygon = new BMap.Polygon(serviceList, {
      strokeColor: '#CE0000',
      strokeWeight: 6,
      fillColor: '#ff8605',
      fillOpacity: .5
    })
    map.addOverlay(polygon)
  }

  // 绘制车辆图标
  renderBikes = (bike_list) => {
    const map = this.map,
      BMap = window.BMap,
      bikeIcon = new BMap.Icon('/assets/bike.jpg', new BMap.Size(36, 42), {
        anchor: new BMap.Size(18, 42),
        imageSize: new BMap.Size(36, 42)
      })
    bike_list.forEach(item => {
      let bike_point = item.split(','),
        bikePoint = new BMap.Point(bike_point[0], bike_point[1]),
        bikeMarker = new BMap.Marker(bikePoint, {icon: bikeIcon});
      map.addOverlay(bikeMarker);
    })
  }

  render() {
    const formList = [
      {
        type: 'SELECT',
        label: '城市',
        field: 'city',
        width: 100,
        options: [
          {
            title: '北京市',
            value: '1'
          }, {
            title: '上海市',
            value: '2'
          }, {
            titel: '重庆市',
            value: '3'
          }
        ]
      }, {
        type: 'DATE',
        label: '订单时间',
        field: 'order_time'
      }, {
        type: 'SELECT',
        label: '订单状态',
        field: 'order_status',
        width: 100,
        options: [
          {
            title: '进行中',
            value: '1'
          }, {
            title: '行程结束',
            value: '2'
          }
        ]
      }
    ]
    return (
      <div>
        <Card style={{ marginBottom: 10 }}>
          <BaseForm formList={formList} filterSubmit={this.filterSubmit} />
        </Card>
        <Card>
          <span>共{this.state.total_count}辆车</span>
          <div id="bikeMap" style={{ height: 500 }}></div>
        </Card>
      </div>
    )
  }
}
