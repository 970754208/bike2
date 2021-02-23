import React, { Component } from 'react'
import { Table } from 'antd'

export default class index extends Component {

  handleChange = (selectedRowKeys, selectedRows) => {
    this.props.dealChange(selectedRowKeys, selectedRows)
  }

  handleRowClick = (record, index1) => {
    // console.log(record)
    let { type, selectedRowKeys, selectedRows, dealChange } = this.props;
    if (type === false) return;
    if (type === 'checkbox') {
      let index = selectedRowKeys.indexOf(index1);
      console.log(selectedRowKeys, selectedRows)
      if(!selectedRowKeys || !selectedRows) {
        selectedRowKeys = [];
        selectedRows = []
      }
      if (index === -1) {
        selectedRowKeys.push(index1);
        selectedRows.push(record)
      } else {
        selectedRowKeys.splice(index, 1);
        selectedRows.splice(index, 1)
      }
    } else {
      selectedRowKeys = [index1];
      selectedRows = [record]
    }
    // console.log(selectedRowKeys, selectedRows)
    dealChange(selectedRowKeys, selectedRows)
  }

  render() {
    const { columns, dataSource, pagination, selectedRowKeys, type } = this.props;
    let rowSelection = {
      type: type || 'radio',
      selectedRowKeys: selectedRowKeys,
      onChange: (a, b) => {
        this.handleChange(a, b)
      }
    }
    if (type === false) {
      rowSelection = null
    }
    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        bordered
        style={{ marginLeft: -25, marginRight: -25 }}
        rowSelection={rowSelection}
        onRow={(record, index) => {
          return {
            onClick: () => {
              this.handleRowClick(record, index)
            }
          }
        }}
      />
    )
  }
}
