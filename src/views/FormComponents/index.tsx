import React, { useEffect } from 'react'
import { HsAdminForm, HsAdminInput, HsAdminSelect } from '@react-admin/pro-components'
import { Button, Space } from 'antd'

const App: React.FC = () => {
  // 每个FormItem里面的表单相关配置参数
  const formItemOptions: any[] = [
    {
      // 标题
      label: '用户名',
      // 绑定字段名称
      name: 'plan_lead_id',
      // 组件名称
      component: 'Select',
      // 是否必填
      required: true,
      // 表单组件相关配置参数，同antd文档
      componentProps: {},
      // FormItem Col配置参数，同antd文档
      FormItemColProps: {
        span: 12
      },
      // FormItem配置参数，同antd文档
      FormItemProps: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      // 自定义后缀插槽
      suffix: () => <div className="flex-none ml-2">后缀</div>
    },
    {
      label: '表名',
      name: 'en_table_name',
      component: 'Input',
      required: true,
      FormItemColProps: {
        span: 12
      },
      // 自定义后缀插槽
      suffix: () => <div className="mt-2">后缀</div>,
      // 自定义插槽父级class名称
      fixClassName: 'flex flex-col'
    },
    {
      label: '表类型',
      name: 'table_type',
      component: 'Select',
      required: true,
      componentProps: {
        options: [
          {
            label: '主表',
            value: 'main'
          },
          {
            label: '从表-属性表',
            value: 'attribute_subtable'
          },
          {
            label: '从表-实体关联表',
            value: 'entity_relation_subtable'
          },
          {
            label: '配置表',
            value: 'configuration'
          },
          {
            label: '其他',
            value: 'other'
          }
        ]
      },
      FormItemColProps: {
        span: 12
      },
      // 自定义前缀插槽
      prefix: () => <div className="flex-none mr-2">前缀</div>
    },
    {
      label: '',
      name: 'submit',
      // 自定义插槽
      slot: 'submit',
      FormItemColProps: {
        span: 24
      },
      FormItemProps: {
        wrapperCol: { offset: 16 }
      }
    }
  ]

  useEffect(() => {}, [])

  return (
    <>
      <HsAdminInput value="Hello dumi!" />
      <HsAdminInput TextArea value="Hello input!" />
      <HsAdminSelect
        defaultValue="lucy"
        style={{ width: 120 }}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true }
        ]}
      />
      <HsAdminForm formItemOptions={formItemOptions} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <div slot="submit">
          <Space>
            <Button type="primary">提交</Button>
            <Button htmlType="button">重置</Button>
          </Space>
        </div>
      </HsAdminForm>
    </>
  )
}

export default App
