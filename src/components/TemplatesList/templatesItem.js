import React from 'react';
import electron from 'electron';
import { Modal, Form, Input, Button, Icon } from 'antd';
import './templatesItem.less';
import NodeFs from '../../node/fs';
const { dialog, app } = electron.remote;
const FormItem = Form.Item;

class From extends React.Component {
    constructor() {
        super();
        this.state = {
            projectPath: '',
            projectName: ''
        };
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            projectPath: app.getPath('home'),
            projectName: ''
        });
    };

    openPath = () => {
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }, (file) => {
            if (file) {
                this.props.form.setFieldsValue({
                    projectPath: file[0],
                });
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
            <div className="modal-form">
                <Form layout="horizontal">
                    <FormItem
                        label="项目路径"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('projectName', {
                            rules: [{ required: true, message: '请填写项目名字' }],
                        })(
                            <Input
                                className="modal-form-input"
                                placeholder="项目名字"
                            />
                        )}
                    </FormItem>
                    <FormItem
                        label="项目路径"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('projectPath', {
                            rules: [{ required: true, message: '请选择项目地址' }],
                        })(
                            <Input
                                className="ant-input"
                                placeholder="项目地址"
                                addonAfter={<div style={{ cursor: 'pointer' }} onClick={this.openPath}><Icon type="folder-open" /></div>}
                            />
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const FormModal = Form.create()(From);

export default class TemplatesItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    onOkClick = () => {
        this.child.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ modalVisible: false });
                // TODO: 根据脚手架生成项目
                const targetDir = `${values.projectPath}\\${values.projectName}`;
                if (!NodeFs.fileExists(targetDir)) {
                    NodeFs.copyDir('src/templates/create-react-app', targetDir);
                    NodeFs.getFilesByDirSync(targetDir);
                    // this.props.history.push('./workbench');
                    this.props.history.push({pathname: './workbench', params: NodeFs.geFileList(targetDir)});
                } else {
                    dialog.showErrorBox('创建项目失败！', '该项目已经存在了');
                }
            }
        });
    };

    onCancelClick = () => {
        this.setState({ modalVisible: false });
    };

    createProject = (scaffold) => {
        this.setState({ modalVisible: true });
    };

    render() {
        const { title, desc } = this.props;
        return (
            <div className="templates-item">
                <img
                    className="templates-item-image"
                    src={"https://img.alicdn.com/tfs/TB1d1QqXwHqK1RjSZFEXXcGMXXa-2840-1596.png"} />
                <div className="templates-item-title">
                    <div>{title}</div>
                </div>
                <div className="templates-item-desc">
                    <div>{title}</div>
                    <Button type="primary" size="small" onClick={this.createProject}>创建</Button>
                </div>
                <Modal
                    title="新建项目"
                    centered
                    visible={this.state.modalVisible}
                    okText="确认"
                    cancelText="取消"
                    onOk={this.onOkClick}
                    onCancel={this.onCancelClick}
                >
                    <FormModal ref={r => this.child = r} />
                </Modal>
            </div>
        )
    }
}