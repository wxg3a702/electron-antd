import React from 'react';
import { Tree, Icon  } from 'antd';
import TreeTest from './treeTest.json';
import './index.less';
const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

export default class FileTree extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTree = (data) => {
        let nodes;
        if (Object.prototype.toString.call(data) == "[object Array]") {
            nodes = data.map(item => {
                let node = (<TreeNode title={item.name} key={item.name} isLeaf></TreeNode>)
                if (item.children && item.children.length !== 0) {
                    node = (
                        <TreeNode title={item.name} key={item.name}>
                            {this.renderTree(item.children)}
                        </TreeNode>
                    );
                }
                return node;
            })
        }
        return nodes;
    }

    render () {
        return (
            <div className="file-tree">
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                >
                    {this.renderTree(TreeTest)}
                </DirectoryTree>
            </div>
        );
    }
}