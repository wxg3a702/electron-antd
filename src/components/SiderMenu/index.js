import React from 'react';
import './index.less';

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
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
    };

    render() { 
        return (
            <ul className="idedemo-sidemenu">
                <li className="idedemo-sidemenu-items">
                    <a onClick={() => this.onClick('project')}>项目</a>
                </li>
                <li className="idedemo-sidemenu-items">
                    <a onClick={() => this.onClick('scaffold')}>模板</a>
                </li>
            </ul>
        );
    }
}