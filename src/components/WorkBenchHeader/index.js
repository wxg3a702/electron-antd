import React from 'react';
import './index.less';

export default class WorkBenchHeader extends React.Component {

    render () {
        const { currentProject } = this.props;
        return (
            <div className="workbench-header">
                <div>项目名</div>
                <div>新建页面</div>
            </div>
        );
    }
}