import React from 'react';
import { Button, Layout } from 'antd';
const { Sider, Content } = Layout;

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { history } = this.props;
    return (
      <Layout>
        <Sider>
          <Button onClick={() => {history.goBack()}}>返回</Button>
        </Sider>
        <Content>
          <div>编辑器</div>
        </Content>
      </Layout>
    );
  }

} // class Page end