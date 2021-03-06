import React, { Component } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import App from './App'
import Common from './Common'
import Main from './Main'
import Home from '@/pages/home'
import Buttons from '@/pages/ui/Buttons'
import Modals from '@/pages/ui/Modals'
import Loading from '@/pages/ui/Loading'
import Notification from '@/pages/ui/Notification'
import Tabs from '@/pages/ui/Tabs'
import Messages from '@/pages/ui/Messages'
import Gallery from '@/pages/ui/Gallery'
import Carousel from '@/pages/ui/Carousel'
import Login from '@/pages/form/Login'
import Reg from '@/pages/form/Reg'
import Basic from '@/pages/table/Basic'
import HighTable from '@/pages/table/HighTable'
import Rich from '@/pages/rich'
import City from '@/pages/city'
import Order from '@/pages/order'
import Detail from '@/pages/order/Detail'
import User from '@/pages/user'
import BikeMap from '@/pages/bikeMap'
import Bar from '@/pages/charts/Bar'
import Pie from '@/pages/charts/Pie'
import Line from '@/pages/charts/Line'
import Permission from '@/pages/permission'

import NoMatch from '@/pages/404'
export default class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/common/order/detail/:id" render={() => {
              return <Common>
                <Detail />
              </Common>
            }} />
            <Route path="/" render={() => {
              return <Main>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/ui/buttons" component={Buttons} />
                  <Route path="/ui/modals" component={Modals} />
                  <Route path="/ui/loadings" component={Loading} />
                  <Route path="/ui/notification" component={Notification} />
                  <Route path="/ui/messages" component={Messages} />
                  <Route path="/ui/tabs" component={Tabs} />
                  <Route path="/ui/gallery" component={Gallery} />
                  <Route path="/ui/carousel" component={Carousel} />
                  <Route path="/form/login" component={Login} />
                  <Route path="/form/reg" component={Reg} />
                  <Route path="/table/basic" component={Basic} />
                  <Route path="/table/high" component={HighTable} />
                  <Route path="/rich" component={Rich} />
                  <Route path="/city" component={City} />
                  <Route path="/order" component={Order} />
                  <Route path="/user" component={User} />
                  <Route path="/bikeMap" component={BikeMap} />
                  <Route path="/charts/bar" component={Bar} />
                  <Route path="/charts/pie" component={Pie} />
                  <Route path="/charts/line" component={Line} />
                  <Route path="/permission" component={Permission} />
                  <Redirect from="/" exact to="/home" />
                  <Route component={NoMatch} />
                </Switch>
              </Main>
            }} />
          </Switch>
        </App>
      </Router>
    )
  }
}
