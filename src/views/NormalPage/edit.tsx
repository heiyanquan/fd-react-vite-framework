import { Form, Input, Modal, Select } from 'antd'
import { forwardRef, useImperativeHandle, useState, memo } from 'react'

const { Option } = Select
const { TextArea } = Input

function Edit(props, ref) {
  const { finish } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const handleOk = () => {
    const values = form.getFieldsValue()
    form
      .validateFields()
      .then((error) => {
        console.log('validateFields', error)
        finish(values)
        handleCancel()
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }
  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' })
        break
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' })
        break
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' })
        break
      default:
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        showModal
      }
    },
    []
  )

  return (
    <Modal title="编辑" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off">
        <Form.Item label="微信昵称" name="nickname">
          <div>12345</div>
        </Form.Item>
        <Form.Item label="手机号" name="nickname">
          <div>12345678901</div>
        </Form.Item>

        <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
          <Select placeholder="请选择角色" onChange={onGenderChange} allowClear>
            <Option value="超管">超管</Option>
            <Option value="普通用户">普通用户</Option>
          </Select>
        </Form.Item>
        <Form.Item label="普通token" name="token">
          <Input placeholder="请输入普通token" />
        </Form.Item>

        <Form.Item label="备注" name="remark">
          <TextArea placeholder="请输入备注" autoSize={{ minRows: 3, maxRows: 8 }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default memo(forwardRef(Edit))
