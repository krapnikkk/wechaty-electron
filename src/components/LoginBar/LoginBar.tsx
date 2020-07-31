import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { Store } from 'antd/lib/form/interface';
import { createBot, logOutBot } from '../../utils/Bot';
import { IBotData, ILoginBarProps } from '../../../typings/interface';

const createTokenBtn = (bool: boolean) => {
    return !bool ? <Form.Item
        label="token"
        name="token"
        rules={[{ required: true, message: 'Please input your bot token!' }]}
    >
        <Input.Password />
    </Form.Item> : null
};

const createNameBtn = (bool: boolean) => {
    return !bool ? <Form.Item
        label="name"
        name="name"
        rules={[{ required: true, message: 'Please input your bot name!' }]}
    >
        <Input />
    </Form.Item> : null
};

export default (props: ILoginBarProps) => {

    
    const onFinish = (values: Store) => {
        createBot(values as IBotData);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            initialValues={{ name: props.name, token: props.token }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {
                createNameBtn(props.online)
            }
            {
                createTokenBtn(props.online)
            }
            <p>{props.msg}</p>
            <Form.Item >
                {props.online ? <Button type="primary"
                    onClick={() => {
                        logOutBot()
                    }}
                >
                    退出Wechaty
                </Button> : <Button type="primary" htmlType="submit">
                        启动Wechaty
                </Button>}
            </Form.Item>
        </Form>
    );
};


