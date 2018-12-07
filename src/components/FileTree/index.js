import React from 'react';
import electron from 'electron'; 
import { Tree, Icon  } from 'antd';
import NodeFs from '../../node/fs';
import './index.less';
const { ipcRenderer, remote } = electron;
const { Menu, MenuItem } = remote;
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

export default class FileTree extends React.Component {
    constructor(props) {
        super(props);
    }

    _onSelect = (selectedkeys, event) => {
        // tab数据交互已经实现，使用Redux解决
        if (event.node.isLeaf()) {
            this.props.actions.updateCurrentEditorTabs(event.node.props.nodeData);
        }
    }

    _onExpand = (selectedkeys, event) => {
    }

    _onDeleteFile = (menuItem, browserWindow, event, nodeEvent) => {
        console.log(menuItem);
        console.log(browserWindow);
        console.log(event);
        console.log(nodeEvent);
        // TODO: 删除文件、更新目录树、更新EditorTabs
        NodeFs.readFilePromise(nodeEvent.node.props.nodeData.value).then(data => {
            console.log(data);
        })
    }

    _onRightClick = (nodeEvent) => { 
        // TODO： 调用electron右击菜单
        const that = this;
        const menu = new Menu()
        // menu.append(new MenuItem({label: '新建文件', click(menuItem, browserWindow, event){ that._onDeleteFile(menuItem, browserWindow, event) }}));
        // menu.append(new MenuItem({label: '新建文件夹', click(menuItem, browserWindow, event){ that._onDeleteFile(menuItem, browserWindow, event) }}));
        menu.append(new MenuItem({label: '删除', click(menuItem, browserWindow, event){ that._onDeleteFile(menuItem, browserWindow, event, nodeEvent) }}));
        menu.popup({window: remote.getCurrentWindow()})
    }

    _renderTree = (data) => {
        let nodes;
        if (Object.prototype.toString.call(data) == "[object Array]") {
            nodes = data.map(item => {
                let node = (<TreeNode title={item.name} key={item.name} nodeData={item} isLeaf></TreeNode>)
                if (item.children && item.children.length !== 0) {
                    node = (
                        <TreeNode title={item.name} key={item.name} nodeData={item}>
                            {this._renderTree(item.children)}
                        </TreeNode>
                    );
                }
                return node;
            })
        }
        return nodes;
    }

    render () {
        const { data } = this.props;
        return (
            <div className="file-tree">
                <DirectoryTree
                    multiple
                    defaultExpandAll={false}
                    onSelect={this._onSelect}
                    onExpand={this.onExpand}
                    onRightClick={this._onRightClick}
                >
                    {this._renderTree(data)}
                </DirectoryTree>
            </div>
        );
    }
}