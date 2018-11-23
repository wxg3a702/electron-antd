import React from 'react';
import './index.less';

class TabPane extends React.Component {
    

    render () {
        const { data } = this.props;
        return (
            <div className="editor-tabs-tabpane">
                <div>{data.fileName}</div>
                <div className="editor-tabs-tabpane-icon">
                    <div>+</div>
                </div>
            </div>
        )
    }
}

export default class EditorTab extends React.Component {

    _renderTabs = (data) => {
        if (data && data.length !== 0) {
            const temp = [];
            data.forEach((item, index) => {
                temp.push(<TabPane data={item} key={index} />);
            });
            return temp;
        } else {
            return null;
        }
    }

    render () {
        // const { data } = this.props;
        const data = [
            {fileName: 'filename', path: 'path'},
            {fileName: 'filename', path: 'path'},
            {fileName: 'filename', path: 'path'},
            {fileName: 'filename', path: 'path'},
            {fileName: 'filename', path: 'path'},
            {fileName: 'filename', path: 'path'},
            {fileName: 'filename', path: 'path'},
            {fileName: 'filename', path: 'path'},
            {fileName: 'filename', path: 'path'},
            {fileName: 'filename', path: 'path'},
        ];
        return (
            <div className="editor-tabs">
                {this._renderTabs(data)}
            </div>
        );
    }
}
