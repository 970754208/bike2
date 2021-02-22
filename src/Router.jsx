import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
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

import NoMatch from '@/pages/404'
export default class IRouter extends Component {
  render() {
    return (
      <Router>
        <App>
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
                <Route component={NoMatch} />
              </Switch>
            </Main>
          }} />
        </App>
      </Router>
    )
  }
}
