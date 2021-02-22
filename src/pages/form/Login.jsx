import React, { Component } from 'react'
import { Button, Card, Checkbox, Form, Icon, Input, message } from 'antd'

const FormItem = Form.Item

class Login extends Component {
  handleSubmit = () => {
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        message.success(`恭喜你，${values.userName}，登录成功，密码为：${values.pwd}`)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card title="登录行内表单" style={{marginBottom: 20}}>
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单">
          <Form layout="horizontal" style={{width: 300}} onSubmit={this.handleSubmit}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      min: 2,
                      max: 8,
                      required: true
                    }
                  ]
                })(
                  <Input prefix={<Icon type="user" />} placeholder="请输入用户名" />
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('pwd', {
                  rules: [
                    {
                      required: true
                    }
                  ]
                })(
                  <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                )
              }
            </FormItem>
            <FormItem>
              <Checkbox>记住密码</Checkbox>
              <a href="/home" style={{float: 'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(Login)