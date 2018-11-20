import React from 'react';
import electron from 'electron';
import { Button, Layout } from 'antd';
import './index.less'
import TemplatesList from '../../components/TemplatesList';
import NodeFs from '../../node/fs';
const { Sider, Content } = Layout;
const { dialog } = electron.remote;
const ipc = electron.ipcRenderer;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  createProject = () => {
    this.props.history.push('./scaffold');
  };

  openProject = () => {
    ipc.send('test', 'hahaha');
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory'],
    }, (file) => {
      if (file) {
        // 读取项目，跳转至工作区
        NodeFs.getFilesByDirPromise(file[0]).then(data => {
          console.log(data);
        });
        // this.props.history.push('./workbench');
      }
    });
  };

  render() {
    const templates = ["ttttt1", "ttttt12"];
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
  }

} // class Home end