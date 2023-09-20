import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Row, Col, Space, Table, Popconfirm, message, Select } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import './style.less'
import EditModal from './edit'
import { usePageChange } from '@/hooks/usePageChange'

const { Option } = Select

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

function HomePage() {
  const [form] = Form.useForm()
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '唯一ID',
      dataIndex: 'id'
    },
    {
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '普通token数量',
      dataIndex: 'normalToken'
    },
    {
      title: '流通token数量',
      dataIndex: 'flowToken'
    },
    {
      title: '注册时间',
      dataIndex: 'registerDate'
    },
    {
      title: '更新人',
      dataIndex: 'updatePerson'
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => callEdit(record)}>
            编辑
          </Button>
          <Popconfirm title="禁用" description="确定要禁用吗?" onConfirm={confirm} onCancel={cancel} okText="确定" cancelText="取消">
            <Button type="link">禁用</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const originData: DataType[] = new Array(24)
    .fill({
      id: '18000000011',
      phone: 18000000011,
      remark: '火石员工张三',
      status: '启用',
      normalToken: '10000',
      flowToken: '10000',
      registerDate: '2023-01-30',
      updatePerson: '李四',
      updateDate: '2023-01-30'
    })
    .map((item, index) => ({
      key: index,
      ...item
    }))
  const [data, setData] = useState<Array<DataType>>([])
  const editRef = useRef<any>(null)

  const doRequest = (page: number) => {
    console.log(page, 'do request with page and other query', ' then set Data', 'finally return total')
    const newData = new Array(10)
      .fill({
        id: `${page}${page}${page}${page}${page}${page}${page}${page}`,
        phone: 18000000011,
        remark: `火石员工张三${page}`,
        status: '启用',
        normalToken: '10000',
        flowToken: '10000',
        registerDate: '2023-01-30',
        updatePerson: '李四',
        updateDate: '2023-01-30'
      })
      .map((item, index) => ({
        key: index,
        ...item
      }))
    setData(newData)
    return Promise.resolve(88)
  }
  const autoPage = usePageChange(
    {
      current: 1,
      total: 0
    },
    doRequest
  )
  useEffect(() => {
    autoPage.handleChange(1)
  }, [])

  const confirm = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    message.success('Click on Yes')
  }
  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e)
    message.error('Click on No')
  }
  const onFinish = (values: any) => {
    setData([...originData])
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const onReset = () => {
    form.resetFields()
  }
  const callEdit = (record) => {
    console.log(record)
    editRef.current.showModal()
  }
  const editFinish = useCallback((record) => {
    setData([...originData])
  }, [])
  const onRoleChange = (value: string) => {
    console.log(value)
  }

  return (
    <div className="home-page-wrapper">
      <Form form={form} {...layout} onFinish={onFinish} onFinishFailed={onFinishFailed} className="filter-part">
        <Row gutter={24}>
          <Col flex="1 1 0">
            <Form.Item label="微信昵称/Token" name="keywords">
              <Input placeholder="请输入微信昵称/Token" />
            </Form.Item>
          </Col>
          <Col flex="1 1 0">
            <Form.Item label="角色" name="role">
              <Select placeholder="请选择角色" onChange={onRoleChange} allowClear>
                <Option value="超管">超管</Option>
                <Option value="普通用户">普通用户</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col flex="210px">
            <Space>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} dataSource={data} className="table" pagination={autoPage.pagination} />
      <EditModal ref={editRef} finish={editFinish} />
    </div>
  )
}

export default HomePage
