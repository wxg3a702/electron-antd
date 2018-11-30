import React from 'react';
import './index.less';
import { Dropdown, Menu, Icon, Button } from 'antd'; 
import * as LocalStorage from '../../utils/localStorage';

export default class WorkBenchHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    _renderProjectList = (data) => {
        const menu = (
            <Menu>
              <Menu.Item key="0">
                <a>项目a</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a>项目b</a>
              </Menu.Item>
            </Menu>
        );
        return menu;
    }

    render () {
        let { currentProject, currentProjectPath } = this.props;
        if (currentProjectPath === "") {
            currentProjectPath = LocalStorage.getLocalStorageItem('currentProjectPath');
        }
        return (
            <div className="workbench-header">
                <div>
                    <Dropdown overlay={this._renderProjectList()} trigger={['click']}>
                        <a className="ant-dropdown-link">
                            {currentProjectPath}<Icon type="down" />
                        </a>
                    </Dropdown>
                </div>
                <div>
                    <Button 
                        className="workbench-header-new-page"
                        onClick={() => console.log('新建页面')}
                    >
                        新建页面
                    </Button>
                </div>
            </div>
        );
    }
}