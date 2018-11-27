import React from 'react';
import { Button, Layout, Icon } from 'antd';
import TemplatesList from '../../components/TemplatesList';
import ScaffoldTab from '../../components/ScaffoldTab';
import './index.less';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions/actions";
import { bindActionCreators } from 'redux';
const { Sider, Content } = Layout;

class Scaffold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: ["create-react-app", "create-react-app"]
    }
  }

  _onTabChange = (item) => {
    const temp = [];
    const a = Math.random().toString();
    temp.push(a);
    this.setState({
      templates: temp
    })
  }

  render() {
    const { history } = this.props;
    return (
      <Layout className="scaffold">
        <Content className="scaffold-content">
          <div className="scaffold-content-header">模板</div>
          <ScaffoldTab onSelectedChange={this._onTabChange} />
          <TemplatesList data={this.state.templates} {...this.props} />
        </Content>
      </Layout>
    );
  }

} // class Page end

const mapStateToProps = (state) => {
  return {
    currentProject: state.currentProject
  }
}

const mapDispatchToProps =  (dispatch) => {
  return {
    actions: {...bindActionCreators(actions, dispatch)}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Scaffold); 