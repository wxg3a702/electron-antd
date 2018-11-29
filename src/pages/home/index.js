import React from 'react';
import electron from 'electron';
import { Button, Layout } from 'antd';
import './index.less'
import TemplatesList from '../../components/TemplatesList';
import FileTree from '../../components/FileTree';
import EditorTabs from '../../components/EditorTab';
import NodeFs from '../../node/fs';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions/actions";
import { bindActionCreators } from 'redux';
import * as LocalStorage from '../../utils/localStorage';

const { Sider, Content } = Layout;
const { dialog } = electron.remote;
const { ipcRenderer } = electron;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  createProject = () => {
    this.props.history.push('./scaffold');
  };

  openProject = () => {
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory'],
    }, (file) => {
      if (file) {
        // 读取项目，跳转至工作区
        // E:\bosi\electron-antd
        // console.log(JSON.stringify(NodeFs.geFileList(file[0])));
        const currentProject = NodeFs.geFileList(file[0]);
        this.props.actions.updateCurrentProject(currentProject);
        this.props.history.push({pathname: './workbench', params: currentProject});
        LocalStorage.setLocalStorageItem('currentProject', JSON.stringify(currentProject));
      }
    });
  };

  render() {
    const templates = ["create-react-app", "create-react-app"];
    let { currentProject } = this.props;
    if (JSON.stringify(currentProject) === '{}') {
      currentProject = JSON.parse(LocalStorage.getLocalStorageItem('currentProject'));
    }
    // 判断当前项目是否存在 true: 工作区  false: 首页
    if (currentProject === null) {
      return (
        <Layout>
          <Content className="flex column center content">
            <TemplatesList data={templates} {...this.props} />
            <div className="flex">
              <Button className="marginStyle" type="primary" onClick={this.openProject}>打开项目</Button>
              <Button className="marginStyle" type="primary" onClick={this.createProject}>创建项目</Button>
            </div>
          </Content>
        </Layout>
      );
    } else {
      return (
        <Layout className="workbench-container">
          <Sider className="workbench-container-sider">
            <FileTree 
              data={currentProject} 
              {...this.props}
            />
          </Sider>
          <Content>
            <EditorTabs {...this.props}/>
          </Content>
        </Layout>
      );
    }
  }

} // class Home end

const mapStateToProps = (state) => {
  return {
    currentProject: state.currentProject,
    currentEditorTabs: state.currentEditorTabs,
    activeEditorTab: state.activeEditorTab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {...bindActionCreators(actions, dispatch)}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home); 