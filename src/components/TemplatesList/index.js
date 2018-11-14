import React from 'react';
import TemplatesItem from './templatesItem';
import './index.less';

export default class TemplatesList extends React.Component {

    renderTemplatesList = () => {
        return ["title1", "title2"].map((item, index) => {
            return <TemplatesItem title={item} key={`${item}${index}`}/>;
        })
    };

    render() {
        return (
            <div className="templates-list-container">
                {this.renderTemplatesList()}
            </div>
        )
    }
}