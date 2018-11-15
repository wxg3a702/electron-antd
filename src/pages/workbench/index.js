import React from 'react';
import { Button, Layout } from 'antd';
import './index.less';
import FileTree from '../../components/FileTree';
const { Sider, Content } = Layout;

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    return (
      <Layout className="workbench-container">
        <Sider className="workbench-container-sider">
          <FileTree />
        </Sider>
        <Content>
          <Button onClick={() => {history.goBack()}}>返回</Button>
        </Content>
      </Layout>
    );
  }

} // class Page end