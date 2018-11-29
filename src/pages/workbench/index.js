import React from 'react';
import { Layout } from 'antd';
import './index.less';
import FileTree from '../../components/FileTree';
import EditorTabs from '../../components/EditorTab';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions/actions";
import { bindActionCreators } from 'redux';
import * as LocalStorage from '../../utils/localStorage';
const { Sider, Content } = Layout;

class WorkBench extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { currentProject } = this.props;
    if (JSON.stringify(currentProject) === '{}') {
      currentProject = JSON.parse(LocalStorage.getLocalStorageItem('currentProject'));
    }
    return (
      <Layout className="workbench-container">
        <Sider className="workbench-container-sider">
          <FileTree 
            data={currentProject} 
            {...this.props}
          />
        </Sider>
        <Content>
          <EditorTabs {...this.props}/>
        </Content>
      </Layout>
    );
  }

} // class Page end


const mapStateToProps = (state) => {
  return {
    currentProject: state.currentProject,
    currentEditorTabs: state.currentEditorTabs,
    activeEditorTab: state.activeEditorTab
  }
}

const mapDispatchToProps =  (dispatch) => {
  return {
    actions: {...bindActionCreators(actions, dispatch)}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkBench); 