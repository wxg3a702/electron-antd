import React from 'react';
import './index.less';
import {Tabs} from 'antd';
import MonacoEditor from '../../components/MonacoEditor';
import NodeFs from '../../node/fs';
import * as FileType from '../../node/fileType';
 
const TabPane = Tabs.TabPane;

export default class EditorTab extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = this.props.currentEditorTabs;
        const activeEditorTab = this.props.activeEditorTab;
        this.state = {
          activeKey: activeEditorTab && activeEditorTab.name || '',
          panes,
        };
      }

    UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        activeKey: nextProps.activeEditorTab && nextProps.activeEditorTab.name || ''
      })
    }

    _onChange = (activeKey) => {
      this.setState({ activeKey });
    }
  
    _onEdit = (targetKey, action) => {
      this[action](targetKey);
    }

    remove = (targetKey) => {
      this.props.actions.removeCurrentEditorTab(targetKey);
    }

    _renderPanes = () => {
      return this.props.currentEditorTabs.map(pane => {
        const code = NodeFs.readFileSync(pane.value);
        const language = FileType.getFileExtname(pane.value);
        return (
          <TabPane 
              tab={pane.name} 
              key={pane.name}
              >
              <MonacoEditor
                  height="400"
                  width="500"
                  language={language}
                  value={code}
              />
          </TabPane>
        );
      })
    }
  
    render() {
      if (this.props.currentEditorTabs && this.props.currentEditorTabs.length !== 0) {
          return (
              <Tabs
                className="editor-tabs"
                onChange={this._onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this._onEdit}
                hideAdd
              >
                {this._renderPanes()}
              </Tabs>
            );
      } else {
          return (
              <div>请打开文件</div>
          )
      }
    }     
}
