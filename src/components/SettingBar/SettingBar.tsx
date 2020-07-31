import { Form, DatePicker, Button, Input } from 'antd';
import React from 'react';
import { Store } from 'antd/lib/form/interface';
const { RangePicker } = DatePicker;
export default () => {
    //TODO
    const onFinish = (values: Store) => {
    };
    return (
        <Form
            name="time_related_controls"
            onFinish={onFinish}
        >
            <Form.Item
                label="name"
                name="name"
                rules={[{ required: true, message: 'Please input your keyword!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="time-picker"
                label="TimePicker"

                rules={[{ type: 'object', required: true, message: 'Please select time!' }]}
            >
                <RangePicker picker="time" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    设置
        </Button>
            </Form.Item>
        </Form>
    );
};