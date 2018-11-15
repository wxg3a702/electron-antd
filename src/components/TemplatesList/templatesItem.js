import React from 'react';
import { Button } from 'antd';
import './templatesItem.less';

export default class TemplatesItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    createProject = (scaffold) => {
        // TODO: 脚手架模板选择与创建
        console.log('根据脚手架创建项目');
        this.props.history.push('./workbench')
    };

    render() {
        const { title, desc } = this.props;
        return (
            <div className="templates-item-container">
                <img 
                    className="templates-item-container-image" 
                    src={"https://img.alicdn.com/tfs/TB1d1QqXwHqK1RjSZFEXXcGMXXa-2840-1596.png"} />
                <div className="templates-item-container-title">
                    <div>{title}</div>
                    <Button type="primary" size="small" onClick={this.createProject}>创建</Button>
                </div>
            </div>
        )
    }
}