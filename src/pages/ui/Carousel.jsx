import React, { Component } from 'react'
import { Card, Carousel } from 'antd'
import './ui.less'

export default class ICarousel extends Component {
  afterChange = (a, b, c) => {
    // console.log(a,b,c)
  }
  beforeChange = (a, b, c) => {
    // console.log(a,b,c)
  }
  render() {
    return (
      <div className="carousel">
        <Card title="文字carousel" className="card-wrap">
          <Carousel afterChange={this.afterChange} beforeChange={this.beforeChange}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="图片carousel" className="card-wrap">
          <Carousel className="img-carousel" autoplay>
            <div>
              <img src="/carousel-img/carousel-1.jpg" alt=""/>
            </div>
            <div>
              <img src="/carousel-img/carousel-2.jpg" alt=""/>
            </div>
            <div>
              <img src="/carousel-img/carousel-3.jpg" alt=""/>
            </div>
          </Carousel>
        </Card>
      </div>
    )
  }
}
