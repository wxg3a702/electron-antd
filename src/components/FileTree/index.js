import React from 'react';
import { Tree, Icon  } from 'antd';
import TreeTest from './treeTest.json';
import './index.less';
import { format } from 'path';
const ipc = require('electron').ipcRenderer
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

export default class FileTree extends React.Component {
    constructor(props) {
        super(props);
    }

    _onSelect = (selectedkeys, event) => {
        console.log(event);
        // TODO: tab页面数据交互
    }

    _onExpand = (selectedkeys, event) => {
        console.log(event);
    }

    _onRightClick = (event) => { 
        console.log(event);
        // TODO： 调用electron右击菜单
        ipc.send('show-context-menu');
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