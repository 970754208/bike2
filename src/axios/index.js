import { Modal } from 'antd';
import axios from 'axios'

export default class Axios {
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