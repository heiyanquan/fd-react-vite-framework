import { Form, Input, Button, Space, InputNumber, Row, Col } from 'antd'
import { useState, memo, useEffect } from 'react'
import { getPlanningDataSheetDetail } from '@/api/planningOverview/dataSheet'
import { getPlanningSubclassList } from '@/api/planningOverview/subclass'
import { getDataSheetAttributes, getDataSheetPlanningDimension, getDataMaintenanceMode } from '@/utils/type'
import './style.less'
import SelectUsers from './SelectUsers'
import HsAdminSelect from '@/components/HsAdminSelect'

const { TextArea } = Input

function Edit() {
  const [form] = Form.useForm()
  const [formValue, setformValue] = useState<any>({})
  const [subclassOptions, setsubclassOptions] = useState<any[]>([])
  const [userOptions, setuserOptions] = useState<any[]>([])

  const onFinish = (values: any) => {
    const formValues = form.getFieldsValue()
    console.log('onFinish', formValues)

    form
      .validateFields()
      .then((error) => {
        console.log('validateFields', error, values)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const onChange = (value: string) => {
    console.log('onChange:', value)
  }
  const onReset = () => {
    form.resetFields()
  }
  const onFill = () => {
    form.setFieldsValue(formValue)
    setuserOptions([
      {
        label: formValue.plan_lead,
        value: formValue.plan_lead_id
      }
    ])
  }

  useEffect(() => {
    getPlanningSubclassList({
      page: 1,
      page_size: 100000
    }).then((res) => {
      setsubclassOptions(
        res.items.map((item: any) => ({
          label: item.name,
          value: item.id
        }))
      )
    })
    getPlanningDataSheetDetail({ id: 1 }).then((res) => {
      setformValue(res)
    })
  }, [])

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <Row>
        <Col span={12}>
          <Form.Item label="表名" name="en_table_name" rules={[{ required: true, message: '请输入表名' }]}>
            <Input placeholder="请输入表名" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="中文名" name="cn_table_name" rules={[{ required: true, message: '请输入中文名' }]}>
            <TextArea placeholder="请输入中文名" autoSize={{ minRows: 3, maxRows: 8 }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="所属数据子类" name="sub_topic_domain_id" rules={[{ required: true, message: '请选择所属数据子类' }]}>
            <HsAdminSelect placeholder="请选择所属数据子类" options={subclassOptions}></HsAdminSelect>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="表类型" name="attributes" rules={[{ required: true, message: '请选择表类型' }]}>
            <HsAdminSelect placeholder="请选择表类型" onChange={onChange} options={getDataSheetAttributes().slice(1)}></HsAdminSelect>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="规划负责人" name="plan_lead_id" rules={[{ required: true, message: '请选择规划负责人' }]}>
            <SelectUsers placeholder="请选择规划负责人" onChange={onChange} options={userOptions}></SelectUsers>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="预计数据量" name="expected_data_volume">
            <InputNumber placeholder="请输入预计数据量" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="维护方式" name="maintenance_method" rules={[{ required: true, message: '请选择维护方式' }]}>
            <HsAdminSelect placeholder="请选择维护方式" mode="multiple" options={getDataMaintenanceMode()}></HsAdminSelect>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="规划维度" name="planning_dimension" rules={[{ required: true, message: '请选择规划维度' }]}>
            <HsAdminSelect placeholder="请选择规划维度" options={getDataSheetPlanningDimension()} disabled></HsAdminSelect>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item wrapperCol={{ offset: 23, span: 1 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
              <Button type="link" htmlType="button" onClick={onFill}>
                Fill form
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default memo(Edit)
