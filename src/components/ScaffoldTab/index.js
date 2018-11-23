import React from 'react';
import './index.less';
import { from } from 'rxjs';

export default class ScaffoldTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }

    _onSelectedChange = (item, index) => {
        this.setState({
            selected: index
        })
        const { onSelectedChange } = this.props;
        if (onSelectedChange) {
            onSelectedChange(item);
        }
    }

    _renderTab = (data) =>{
        const a = [];
        if (data && data.length !==0) {
            data.forEach((item, index) => {
                a.push(
                    <div 
                        className={index === this.state.selected ? 'selected item' : 'item'} 
                        key={item.type}
                        onClick={() => this._onSelectedChange(item, index)}
                    >
                        {item.name}
                    </div>
                );
            })
            return a;
        } else {
            return null;
        }
    }

    render() {
        const data = [
            {name: '模板分类', type: 'type1'},
            {name: '模板分类', type: 'type2'},
            {name: '模板分类', type: 'type3'},
            {name: '模板分类', type: 'type4'},
        ];
        return (
            <div className="scaffold-tab">
                {this._renderTab(data)}
            </div>
        );
    }
}