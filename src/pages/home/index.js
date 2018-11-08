import React from 'react';
import { Button, Layout } from 'antd';
import './index.less'
const { Sider, Content } = Layout;
const ipc = require('electron').ipcRenderer;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  onclick = () => {
    ipc.send('test', 'hahaha');
  };

  createProject = () => {
    this.props.history.push('./scaffold');
  };

  openProject = () => {
    
  };

  render() {
    return (
      <Layout>
        <Sider className="sider">
          <div>最近使用</div>
        </Sider>
        <Content className="flex column center content">
          <div className="marginStyle">LOGO</div>
          <div className="marginStyle">工具名</div>
          <div className="flex column">
            <Button className="marginStyle" type="primary" onClick={this.createProject}>创建新项目</Button>
            <Button className="marginStyle" type="primary" onClick={this.onclick}>打开项目</Button>
          </div>
        </Content>
      </Layout>
    );
  }

} // class Home end