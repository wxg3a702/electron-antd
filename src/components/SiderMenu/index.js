import React from 'react';
import './index.less';

export default class SideMenu extends React.Component {

    

    render() {
        return (
            <ul className="idedemo-sidemenu">
                <li className="idedemo-sidemenu-items">
                    <a>项目</a>
                </li>
                <li className="idedemo-sidemenu-items">
                    <a>模板</a>
                </li>
            </ul>
        );
    }
}