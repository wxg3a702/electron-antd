import React from 'react';
import { Button, Layout } from 'antd';
import './index.less';
const { Sider, Content } = Layout;

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    return (
      <Layout>
        <Sider className="sider">
          <div>脚手架模板分类</div>
          <Button onClick={() => {history.goBack()}}>返回</Button>
        </Sider>
        <Content>
          <div>脚手架选择</div>
        </Content>
      </Layout>
    );
  }

} // class Page end