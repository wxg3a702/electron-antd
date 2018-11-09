import React from 'react';
import electron from 'electron';
import { Form, Input, Button, Icon } from 'antd';
const { dialog, app } = electron.remote;
import "./index.less";
const FormItem = Form.Item;

class UmiPage extends React.Component {
    constructor() {
        super();
        this.state = {
            path: app.getPath('home')
        };
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            projectPath: this.state.path
        });
    };

    openPath = () => {

    };  

    nextStep = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
    };
    
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 16 },
        };
        const buttonItemLayout = {
          wrapperCol: { span: 20, offset: 4 },
        };
        return (
          <div className="umi-form">
            <div className="umi-form-title">新建项目</div>
            <Form layout="horizontal">
              <FormItem
                label="项目路径"
                {...formItemLayout}
                className="umi-form-ant-form-item-label label"
              >
                {getFieldDecorator('projectName', {
                    rules: [{ required: true, message: '请填写项目名字' }],
                })(
                    <Input 
                        className="umi-form-input" 
                        placeholder="项目名字" 
                    />
                )}
              </FormItem>
              <FormItem
                label="项目路径"
                {...formItemLayout}
                className="umi-form-ant-form-item-label label"
              >
                {getFieldDecorator('projectPath', {
                    rules: [{ required: true, message: '请选择项目地址' }],
                })(
                    <div>
                        <Input 
                            className="umi-form-input" 
                            placeholder="项目地址" 
                        />
                        <div style={{ cursor: 'pointer' }} onClick={this.openPath}><Icon type="folder-open" /></div>
                    </div>
                )}
              </FormItem>
            </Form>
            <div className="umi-form-footer">
                <Button 
                    type="primary" 
                    className="umi-form-next-button" 
                    onClick={this.nextStep}
                >下一步</Button>
            </div>
          </div>
        );
    }
}

const UmiPageForm = Form.create()(UmiPage);

export default UmiPageForm;
