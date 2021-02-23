import { Modal } from 'antd';
import axios from 'axios'
import Utils from '@/utils'
export default class Axios {
  static requestList (_this, url, params) {
    this.ajax({
      url,
      data: {
        params
      }
    }).then(res => {
      if (res.code === 0) {
        console.log(res)
        _this.setState({
          dataSource: res.result.item_list.map((item, index) => {
            item.key = index;
            return item;
          }),
          pagination: Utils.pagination(res, current => {
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    })
  }

  static ajax (opt) {
    return new Promise((res, rej) => {
      let loadDOM = document.querySelector('.ajax-loading');
      loadDOM.style.display = 'block';
      axios({
        url: opt.url,
        baseURL: 'https://mock.mengxuegu.com/mock/6013ef7d29865558417100e6',
        params: (opt.data && opt.data.params) || ''
      }).then(response => {
        loadDOM.style.display = 'none';
        let data = response.data;
        if (data.code === 0) {
          res(data)
        } else {
          Modal.warn({
            title: '警告',
            content: data.msg
          })
          rej(data)
        }
      }).catch(err => {
        rej(err)
      })
    })
  }
}