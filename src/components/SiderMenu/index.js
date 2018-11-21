import React from 'react';
import './index.less';

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'project'
        }
    }
    
    onClick = (type) => {
        let currentHref = '#/';
        switch (type) {
            case 'project':
                currentHref = '#/';
                break;
            case 'scaffold':
                currentHref = '#/scaffold';
                break;
            default:
                break;
        }
        location.href = currentHref;
        this.setState({
            type
        })
    };

    render() { 
        return (
            <ul className="idedemo-sidemenu">
                <li>
                    <a className={this.state.type === 'project' ? 'idedemo-sidemenu selected' : 'idedemo-sidemenu li a'} onClick={() => this.onClick('project')}><i className="iconfont icon-xiangmu idedemo-sidemenu-iconfont" />项目</a>
                </li>
                <li>
                    <a className={this.state.type === 'scaffold' ? 'idedemo-sidemenu selected' : 'idedemo-sidemenu li a'} onClick={() => this.onClick('scaffold')}><i className="iconfont icon-mmoban idedemo-sidemenu-iconfont" />模板</a>
                </li>
            </ul>
        );
    }
}