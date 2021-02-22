import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import draftHTML from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class index extends Component {
  state = {
    editorState: '',
    contentState: ''
  }
  onEditorStateChange = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState
    })
  }
  onContentStateChange = (contentState) => {
    // console.log(contentState)
    this.setState({
      contentState
    })
  }
  clear = () => {
    this.setState({
      editorState: '',
      contentState: ''
    })
  }
  showContent = () => {
    this.setState({
      show: true
    })
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.clear} style={{marginRight: 10}}>清空内容</Button>
          <Button type="primary" onClick={this.showContent}>显示内容内容</Button>
        </Card>
        <Card title="富文本">
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onContentStateChange}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
          />
        </Card>
        <Modal 
          title="富文本内容"
          visible={this.state.show}
          onCancel={()=>this.setState({show: false})}
          onOk={()=>this.setState({show: false})}
        >
          {draftHTML(this.state.contentState)}
        </Modal>
      </div>
    )
  }
}
