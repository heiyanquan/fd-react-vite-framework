import { Form, Button, Space } from 'antd'
import { useState, memo, useEffect } from 'react'
import { getPlanningDataSheetDetail } from '@/api/planningOverview/dataSheet'
import { getPlanningSubclassList } from '@/api/planningOverview/subclass'
import { getDataSheetAttributes, getDataSheetPlanningDimension, getDataMaintenanceMode } from '@/utils/type'
import './style.less'
import SelectUsers from './SelectUsers'
import HsAdminForm from '@/components/HsAdminForm'

const FormPage: React.FC = () => {
  const [form] = Form.useForm()
  const [formValue, setformValue] = useState<any>({})
  const [userOptions, setuserOptions] = useState<any[]>([])
  const [formItemOptions, setformItemOptions] = useState<any[]>([
    {
      label: '表名',
      name: 'en_table_name',
      component: 'Input',
      required: true,
      FormItemColProps: {
        span: 12
      }
    },
    {
      label: '中文名',
      name: 'cn_table_name',
      component: 'TextArea',
      required: true,
      FormItemColProps: {
        span: 12
      }
    },
    {
      label: '所属数据子类',
      name: 'sub_topic_domain_id',
      component: 'Select',
      required: true,
      componentProps: {
        options: [],
        'label-field': 'name',
        'value-field': 'id'
      },
      FormItemColProps: {
        span: 12
      }
    },
    {
      label: '表类型',
      name: 'attributes',
      component: 'Select',
      required: true,
      componentProps: {
        options: getDataSheetAttributes().slice(1)
      },
      FormItemColProps: {
        span: 12
      }
    },
    {
      label: '规划负责人',
      name: 'plan_lead_id',
      required: true,
      slot: 'plan_lead_id',
      FormItemColProps: {
        span: 12
      }
    },
    {
      label: '预计数据量',
      name: 'expected_data_volume',
      component: 'InputNumber',
      FormItemColProps: {
        span: 12
      }
    },
    {
      label: '维护方式',
      name: 'maintenance_method',
      component: 'Select',
      required: true,
      componentProps: {
        options: getDataMaintenanceMode(),
        multiple: true
      },
      FormItemColProps: {
        span: 12
      }
    },
    {
      label: '规划维度',
      name: 'planning_dimension',
      component: 'Select',
      required: true,
      componentProps: {
        options: getDataSheetPlanningDimension()
      },
      FormItemColProps: {
        span: 12
      }
    },
    {
      label: '',
      name: 'submit',
      slot: 'submit',
      FormItemColProps: {
        span: 24
      },
      FormItemProps: {
        wrapperCol: { offset: 16 }
      }
    }
  ])

  const onFinish = (values: any) => {
    const formValues = form.getFieldsValue()
    console.log('formValues', values, formValues)
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
      const subclassOptions = res.items.map((item: any) => ({
        label: item.name,
        value: item.id
      }))
      setformItemOptions((options) => {
        options[2].componentProps.options = subclassOptions
        return [...options]
      })
    })
    getPlanningDataSheetDetail({ id: 1 }).then((res) => {
      setformValue(res)
    })
  }, [])

  return (
    <HsAdminForm formItemOptions={formItemOptions} form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <div slot="plan_lead_id">
        <SelectUsers placeholder="请选择规划负责人" onChange={onChange} options={userOptions}></SelectUsers>
      </div>
      <div slot="submit">
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            填充表单
          </Button>
        </Space>
      </div>
    </HsAdminForm>
  )
}

export default memo(FormPage)
