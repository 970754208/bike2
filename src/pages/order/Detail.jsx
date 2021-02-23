import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'antd'
import './detail.less'
import axios from '@/axios'

class Detail extends Component {
  state = {
    detailInfo: {}
  }

  componentDidMount() {
    this.requestList();
  }

  requestList = () => {
    // console.log(this.props)
    const { match } = this.props;
    axios.ajax({
      url: '/order/detail',
      data: {
        params: match.params
      }
    }).then(res => {
      // console.log(res)
      if (res.code === 0) {
        this.setState({
          detailInfo: res.result
        })
        this.renderMap(res.result)
      }
    })
  }

  // 绘制地图
  renderMap = (result) => {
    this.map = new window.BMap.Map('orderDetailMap');
    this.addMapControl();
    this.renderArea(result.area)
    this.renderRoute(result.position_list)
  }

  // 添加地图控件
  addMapControl = () => {
    const map = this.map;
    const BMap = window.BMap;
    map.addControl(new BMap.NavigationControl())
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    // map.addControl(new BMap.ZoomControl())
  }

  // 绘制行驶路线
  renderRoute = positionList => {
    const map = this.map;
    const BMap = window.BMap;
    let start_point = positionList[0],
      end_point = positionList[positionList.length - 1],
      startPoint = new BMap.Point(start_point.lon, start_point.lat),
      endPoint = new BMap.Point(end_point.lon, end_point.lat),
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
    map.addOverlay(startMarker);
    map.addOverlay(endMarker);
    //地图初始化
    map.centerAndZoom(endPoint, 12)
    
    // 起止路线
    const routeList = [];
    positionList.forEach(item => {
      routeList.push(new BMap.Point(item.lon, item.lat))
    })
    let polyline = new BMap.Polyline(routeList, {
      strokeColor: '#09f',
      strokeWeight: 6
    })
    map.addOverlay(polyline)
  }

  // 绘制禁停区
  renderArea = list => {
    const areaList = [];
    const BMap = window.BMap;
    const map = this.map;
    list.forEach(item => {
      areaList.push(new BMap.Point(item.lon, item.lat));
    })
    let polygon = new BMap.Polygon(areaList, {
      strokeColor: '#CE0000',
      strokeWeight: 6,
      fillColor: '#ff8605',
      fillOpacity: .5
    })
    map.addOverlay(polygon)
  }

  render() {
    const { detailInfo } = this.state;
    return (
      <div>
        <Card>
          <div className="order-map" id="orderDetailMap"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">
                  {detailInfo.mode === 2 ? '服务区模式' : '指定停车点模式'}
                </div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">
                  {detailInfo.order_sn}
                </div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">
                  {detailInfo.bike_sn}
                </div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">
                  {detailInfo.user_name}
                </div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">
                  {detailInfo.mobile}
                </div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">
                  {detailInfo.start_location}
                </div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">
                  {detailInfo.end_location}
                </div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">
                  {detailInfo.distance / 1000 + 'km'}
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}
export default withRouter(Detail)