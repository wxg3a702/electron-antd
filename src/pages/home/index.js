import React from 'react';
import { Button, Layout } from 'antd';
import './index.less'
import TemplatesList from '../../components/TemplatesList';
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
    const templates = ["ttttt1", "ttttt12"];
    return (
      <Layout>
        <Content className="flex column center content">
          <TemplatesList data={templates} {...this.props}/>
          <div className="flex">
            <Button className="marginStyle" type="primary" onClick={this.openProject}>打开项目</Button>
            <Button className="marginStyle" type="primary" onClick={this.createProject}>创建项目</Button>
          </div>
        </Content>
      </Layout>
    );
  }

} // class Home end