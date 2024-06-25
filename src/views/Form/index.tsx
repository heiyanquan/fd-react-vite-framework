import { Form, Button, Input, Space } from 'antd'
import { FC } from 'react'
import './style.less'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const FormPage: FC = () => {
  const [form] = Form.useForm()
  const onFinish = (values: any) => {
    console.log('Received values of form:', values)
    console.log('form:', form.getFieldsValue())
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {console.log('[ fields ] >', fields)}
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item {...restField} name={[name, 'first']} rules={[{ required: true, message: 'Missing first name' }]}>
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item {...restField} name={[name, 'last']} rules={[{ required: true, message: 'Missing last name' }]}>
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormPage
