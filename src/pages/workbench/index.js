import React from 'react';
import { Button, Layout } from 'antd';
import './index.less';
import FileTree from '../../components/FileTree';
import MonacoEditor from '../../components/MonacoEditor';
const { Sider, Content } = Layout;

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '//code'
    }
  }

  onChange = (e) => {
    console.log('onChange', e);
  }

  editorDidMount = (editor) => {
    console.log('editorDidMount', editor, editor.getValue(), editor.getModel());
    this.editor = editor;
  }

  render() {
    const { history } = this.props;
    const { code } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: true,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true
    };
    return (
      <Layout className="workbench-container">
        <Sider className="sider">
          <FileTree data={this.props.location.params}/>
        </Sider>
        <Content className="content">
          <MonacoEditor
            language="javascript"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
          />
          <Button onClick={() => { history.goBack() }}>返回</Button>
        </Content>
      </Layout>
    );
  }

} // class Page end