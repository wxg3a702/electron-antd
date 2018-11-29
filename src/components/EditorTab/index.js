import React from 'react';
import './index.less';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

import MonacoEditor from '../../components/MonacoEditor';

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
        activeKey: nextProps.activeEditorTab.name
      })
    }

    _onChange = (activeKey) => {
      this.setState({ activeKey });
    }
  
    _onEdit = (targetKey, action) => {
      this[action](targetKey);
    }

    remove = (targetKey) => {
      let activeKey = this.state.activeKey;
      let lastIndex;
      this.state.panes.forEach((pane, i) => {
        if (pane.name === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.state.panes.filter(pane => pane.name !== targetKey);
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].name;
      }
      this.props.actions.removeCurrentEditorTab(targetKey);
    }

    _renderPanes = () => {
      return this.props.currentEditorTabs.map(pane => 
          <TabPane 
              tab={pane.name} 
              key={pane.name}
              >
              <MonacoEditor
                  height="450"
                  width="500"
                  language="javascript"
                  value={pane.name}
              />
          </TabPane>
      )
    }
  
    render() {
      if (this.props.currentEditorTabs && this.props.currentEditorTabs.length !== 0) {
          return (
              <Tabs
                onChange={this._onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this._onEdit}
                className="editoe-tabs"
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
