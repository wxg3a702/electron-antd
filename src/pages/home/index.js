import React from 'react';
import { Button, Layout } from 'antd';
import './index.less'
const { Sider, Content } = Layout;
const ipc = require('electron').ipcRenderer;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  createProject = () => {
    this.props.history.push('./scaffold');
  };

  openProject = () => {
    ipc.send('test', 'hahaha');
  };

  render() {
    return (
      <Layout>
        <Content className="flex column center content">
          <div className="flex">
          <Button className="marginStyle" type="primary" onClick={this.openProject}>打开项目</Button>
            <Button className="marginStyle" type="primary" onClick={this.createProject}>创建项目</Button>
          </div>
        </Content>
      </Layout>
    );
  }

} // class Home end