import React, { Component } from 'react'
import { Button, Icon, Card, Switch, Modal, Select, Checkbox, InputNumber, Form, Input, message, Radio, DatePicker, TimePicker, Upload } from 'antd'
import moment from 'moment'

const FormItem = Form.Item
const { Option } = Select
const TextArea = Input.TextArea

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function beforeUpload(file) {
  return false
}

class Login extends Component {

  handleChange = ({ fileList }) => this.setState({ fileList });

  state = {
    imageUrl: '',
    previewImage: '',
    previewVisible: false,
  }

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${values.userName}，恭喜你注册成功，密码为${values.pwd}`)
        console.log(values)
      }
    })
  }
  render() {
    const { imageUrl, fileList, previewImage, previewVisible } = this.state;
    const layoutFormat = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    }
    const subLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20, offset: 4 }
      }
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem label="用户名" {...layoutFormat}>
              {
                getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(
                  <Input placeholder="请输入用户名" />
                )
              }
            </FormItem>
            <FormItem label="密码" {...layoutFormat}>
              {
                getFieldDecorator('pwd', {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(
                  <Input type="password" placeholder="请输入密码" />
                )
              }
            </FormItem>
            <FormItem label="密码" {...layoutFormat}>
              {
                getFieldDecorator('sex', {
                  initialValue: 'female'
                })(
                  <Radio.Group>
                    <Radio value="man">男</Radio>
                    <Radio value="female">女</Radio>
                  </Radio.Group>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...layoutFormat}>
              {
                getFieldDecorator('age', {
                  initialValue: 18
                })(
                  <InputNumber />
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...layoutFormat}>
              {
                getFieldDecorator('status', {
                  initialValue: '1'
                })(
                  <Select>
                    <Option value="1">帅哥一枚</Option>
                    <Option value="2">北大才子</Option>
                    <Option value="3">职业教师</Option>
                    <Option value="4">游泳健将</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="爱好" {...layoutFormat}>
              {
                getFieldDecorator('hobbies', {
                  initialValue: '1'
                })(
                  <Select mode="multiple">
                    <Option value="1">打篮球</Option>
                    <Option value="2">踢足球</Option>
                    <Option value="3">乒乓球</Option>
                    <Option value="4">游泳</Option>
                    <Option value="5">桌球</Option>
                    <Option value="6">跑步</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否已婚" {...layoutFormat}>
              {
                getFieldDecorator('married', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Switch checkedChildren="是" unCheckedChildren="否" />
                )
              }
            </FormItem>
            <FormItem label="生日" {...layoutFormat}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2021-01-01 10:21:20')
                })(
                  <DatePicker showTime />
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...layoutFormat}>
              {
                getFieldDecorator('address', {
                  initialValue: '河北省保定市'
                })(
                  <TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
                )
              }
            </FormItem>
            <FormItem label="早起时间" {...layoutFormat}>
              {
                getFieldDecorator('wakeup', {
                  initialValue: moment('09:10:12', 'HH:mm:ss')
                })(
                  <TimePicker />
                )
              }
            </FormItem>
            <FormItem label="头像" {...layoutFormat}>
              {
                getFieldDecorator('face')(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                    fileList={fileList}
                    onPreview={this.handlePreview}
                  >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...subLayout}>
              <Checkbox>我已阅读过<a href="/home">慕课协议</a></Checkbox>
            </FormItem>
            <FormItem {...subLayout}>
              <Button htmlType="submit" type="primary">提交</Button>
            </FormItem>
          </Form>
          <Modal
            visible={previewVisible}
            footer={null}
            title="预览"
            onCancel={() => this.setState({ previewVisible: false })}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Card>
      </div>
    )
  }
}
export default Form.create()(Login)