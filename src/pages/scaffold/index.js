import React from 'react';
import { Button, Layout, Icon } from 'antd';
import TemplatesList from '../../components/TemplatesList';
import './index.less';
const { Sider, Content } = Layout;

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { history } = this.props;
    const templates = ["标题11111", "标题22222"];
    return (
      <Layout className="scaffold">
        <Content className="scaffold-content">
          <TemplatesList data={templates} {...this.props} />
        </Content>
      </Layout>
    );
  }

} // class Page end