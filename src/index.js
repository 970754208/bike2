import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Router from './Router';
import './style/common.less'
import './style/loading.less'
import storeCreator from './redux/store'

const store = storeCreator();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
