import React from 'react';
import TemplatesItem from './templatesItem';
import './index.less';

export default class TemplatesList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTemplatesList = (templates) => {
        return templates.map((item, index) => {
            return <TemplatesItem {...this.props} title={item} key={`${item}${index}`} />;
        })
    };

    render() {
        const { data } = this.props;
        return (
            <div className="templates-list">
                {this.renderTemplatesList(data)}
            </div>
        )
    }
}