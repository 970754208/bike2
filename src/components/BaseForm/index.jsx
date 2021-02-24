import React, { Component } from 'react'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import Utils from '@/utils';

const FormItem = Form.Item
const { RangePicker } = DatePicker

class BaseForm extends Component {

  renderItem = (formList) => {
    const { getFieldDecorator } = this.props.form;
    return formList.map(item => {
      let backDom = null;
      if (item.type === 'SELECT') {
        backDom =  <FormItem label={item.label} key={item.field}>
          {
            getFieldDecorator(item.field, {
              initialValue: item.initialValue
            })(
              <Select style={{width: item.width}} placeholder={item.placeholder || '全部'}>
                { Utils.getOptions(item.options) }
              </Select>
            )
          }
        </FormItem>
      } else if (item.type === 'INPUT') {
        backDom =  <FormItem label={item.label} key={item.field}>
          {
            getFieldDecorator(item.field)(
              <Input placeholder={item.placeholder} />
            )
          }
        </FormItem>
      } else if (item.type === 'DATE') {
        backDom =  <FormItem label={item.label} key={item.field}>
          {
            getFieldDecorator(item.field)(
              <DatePicker placeholder={item.placeholder} />
            )
          }
        </FormItem>
      } else if (item.type === '起止时间') {
        backDom =  <FormItem label={item.label} key={item.field}>
          {
            getFieldDecorator(item.field)(
              <RangePicker />
            )
          }
        </FormItem>
      }
      return backDom;
    })
  }

  handleSubmit = () => {
    const { filterSubmit } = this.props;
    let params = this.props.form.getFieldsValue();
    filterSubmit(params);
  }

  handleReset = () => {
    // console.log(this.props.form)
    this.props.form.resetFields();
  }

  render() {
    const { formList } = this.props;
    return (
      <Form layout="inline">
        {this.renderItem(formList)}
        <FormItem>
          <Button type="primary" style={{marginRight: 10}} onClick={this.handleSubmit}>查询</Button>
          <Button onClick={this.handleReset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}
export default Form.create()(BaseForm)
