import React from 'react';
import { Button, Layout, Icon } from 'antd';
import UmiPage from './umi';
import TemplatesList from '../../components/TemplatesList';
import './index.less';
const { Sider, Content } = Layout;

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ''
    }
  }

  changeType = (type) => {
    this.setState({
      type
    });
  }

  renderContent = () => {
    if (this.state.type === 'umi') {
      return (
        <UmiPage />
      );
    } 
    return (
      <div>默认类型</div>
    );
  };

  render() {
    const { history } = this.props;
    const templates = ["标题11111", "标题22222"];
    return (
      <Layout className="scaffold">
        {/* <Sider className="scaffold-sider">
          <div>脚手架模板分类</div>
          <Button className="scaffold-sider-umi-button" onClick={() => this.changeType('umi')}>UMI</Button>
          <div className="scaffold-sider-back-button" onClick={() => {history.goBack()}}>
              <Icon type="arrow-left" />
          </div>
        </Sider> */}
        <Content className="scaffold-content">
          {/* {this.renderContent()} */}
          <TemplatesList  data={templates} {...this.props}/>
        </Content>
      </Layout>
    );
  }

} // class Page end