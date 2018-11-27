import React from 'react';
import './index.less';
import {Tabs} from 'antd';
const TabPane = Tabs.TabPane;

import MonacoEditor from '../../components/MonacoEditor';

export default class EditorTab extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
          { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
          { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
          { title: 'Tab 3', content: 'Content of Tab 3', key: '3' },
        ];
        this.state = {
          activeKey: panes[0].key,
          panes,
        };
      }
    
      _onChange = (activeKey) => {
        this.setState({ activeKey });
      }
    
      _onEdit = (targetKey, action) => {
        this[action](targetKey);
      }
    
      add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
      }
    
      remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
          activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
      }

      _renderPanes = () => {
        return this.state.panes.map(pane => 
            <TabPane 
                tab={pane.title} 
                key={pane.key} 
                closable={pane.closable}
                >{pane.content}
                <MonacoEditor
                    height="450"
                    width="500"
                    language="javascript"
                    value={pane.content}
                />
            </TabPane>
        )
      }
    
      render() {
        if (this.state.panes && this.state.panes.length !== 0) {
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
