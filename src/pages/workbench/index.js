import React from 'react';
import { Button, Layout } from 'antd';
import './index.less';
import FileTree from '../../components/FileTree';
import EditorTabs from '../../components/EditorTab';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions/actions";
import { bindActionCreators } from 'redux';
const { Sider, Content } = Layout;

class WorkBench extends React.Component {
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
        <Sider className="workbench-container-sider">
          <FileTree data={this.props.currentProject}/>
        </Sider>
        <Content>
          {/* <Button onClick={() => { history.goBack() }}>返回</Button> */}
          {/* <MonacoEditor
            height="450"
            width="500"
            language="javascript"
            value={code}
            options={options}
            onChange={this.onChange}
            editorDidMount={this.editorDidMount}
          /> */}
          <EditorTabs />
        </Content>
      </Layout>
    );
  }

} // class Page end


const mapStateToProps = (state) => {
  return {
    currentProject: state.currentProject
  }
}

const mapDispatchToProps =  (dispatch) => {
  return {
    actions: {...bindActionCreators(actions, dispatch)}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkBench); 