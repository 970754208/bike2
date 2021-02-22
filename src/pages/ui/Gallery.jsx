import React, { Component } from 'react'
import { Card, Row, Col, Modal } from 'antd'

const { Meta } = Card

export default class Gallery extends Component {
  state = {
    imgs: [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png']
    ],
    show: false,
    src: ''
  }
  showImg = src => {
    this.setState({
      show: true,
      src: `/gallery/${src}`
    })
  }
  render() {
    const imgList = this.state.imgs.map(items => items.map(item => {
      return <Card 
        key={item} 
        className="card-img"
        cover={<img src={`/gallery/${item}`} alt=""/>}
        hoverable
        onClick={()=>{this.showImg(item)}}
      >
        <Meta title="React" description="React description" />
      </Card>
    }))
    return (
      <div className="gallery">
        <Row gutter={8}>
          <Col span={4}>
            {imgList[0]}
          </Col>
          <Col span={6}>
            {imgList[1]}
          </Col>
          <Col span={5}>
            {imgList[2]}
          </Col>
          <Col span={5}>
            {imgList[3]}
          </Col>
          <Col span={4}>
            {imgList[4]}
          </Col>
        </Row>
        <Modal
          title="图片展示"
          footer={null}
          visible={this.state.show}
          onCancel={()=>this.setState({show: false})}
          style={{top: 10}}
        >
          <img src={this.state.src} style={{width: '100%'}} alt=""/>
        </Modal>
      </div>
    )
  }
}
