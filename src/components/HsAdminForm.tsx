import { memo } from 'react'
import { Form, InputNumber, Row, Col, AutoComplete, Cascader, Checkbox, DatePicker, Radio, Switch, TimePicker, Transfer, TreeSelect } from 'antd'
import HsAdminSelect from '@/components/HsAdminSelect'
import HsAdminInput from '@/components/HsAdminInput'

interface Options {
  label?: string
  // 绑定字段名称
  name: string
  // 是否必填
  required?: boolean
  // 组件名称
  component: string
  // 自定义插槽
  slot?: string
  // 自定义前缀插槽
  prefix?: string
  // 自定义后缀插槽
  suffix?: string
  // 自定义验证规则，同antd文档
  rules?: object[]
  // 表单相关配置参数，同antd文档
  componentProps?: any
  // FormItem Col配置参数，同antd文档
  FormItemColProps?: any
  // FormItem配置参数，同antd文档
  FormItemProps?: any
}
interface Props {
  // 除了formItemOptions、rowProps、children以外剩余参数均为Form Props配置参数，同antd文档
  rest?: any
  // Row Props配置参数，同antd文档
  rowProps?: any
  // 每个FormItem里面的表单相关配置参数
  formItemOptions: Options[]
  // 表单填写的参数
  formValue?: any
  // 插槽子节点
  children?: any[]
}

const HsAdminForm: any = (props: Props) => {
  const { formItemOptions, rowProps, children, ...rest } = props
  const slotsMap = Object.create(null)
  children?.forEach((item) => {
    const { slot, children: slotChildren } = item.props
    slotsMap[slot] = slotChildren
  })

  const handleRules = (item: Options) => {
    const selectComponentsList = ['Select', 'DatePicker', 'TreeSelect', 'HsAdminSelect', 'Cascader', 'Checkbox', 'Radio', 'TimePicker', 'Transfer']
    let prefix: string = '请输入'
    if (item.component && selectComponentsList.includes(item.component)) {
      prefix = '请选择'
    }
    if (item.rules) {
      return item.rules
    } else if (item.required) {
      return [{ required: true, message: `${prefix}${item.label}` }]
    }
  }
  const componentMap: any = {
    Input: {
      Component: HsAdminInput
    },
    TextArea: {
      Component: HsAdminInput,
      defaultProps: { TextArea: true }
    },
    Select: {
      Component: HsAdminSelect
    },
    InputNumber: {
      Component: InputNumber
    },
    AutoComplete: {
      Component: AutoComplete
    },
    Cascader: {
      Component: Cascader
    },
    Checkbox: {
      Component: Checkbox
    },
    DatePicker: {
      Component: DatePicker
    },
    Radio: {
      Component: Radio
    },
    Switch: {
      Component: Switch
    },
    TimePicker: {
      Component: TimePicker
    },
    Transfer: {
      Component: Transfer
    },
    TreeSelect: {
      Component: TreeSelect
    }
  }
  const loadItemComponent = (item: Options) => {
    if (item.slot) {
      return slotsMap[item.slot]
    } else {
      const { Component, defaultProps } = componentMap[item.component]
      return !item.slot && <Component {...defaultProps} {...item.componentProps} />
    }
  }

  return (
    <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off" {...rest}>
      <Row {...rowProps}>
        {formItemOptions.map((item) => {
          return (
            <Col span={12} {...item.FormItemColProps} key={item.name}>
              <Form.Item key={item.name} label={item.label} name={item.name} rules={handleRules(item)} {...item.FormItemProps}>
                {loadItemComponent(item)}
              </Form.Item>
            </Col>
          )
        })}
      </Row>
    </Form>
  )
}

export default memo(HsAdminForm)
