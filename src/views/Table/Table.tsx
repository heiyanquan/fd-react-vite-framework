import React, { useState } from 'react'
import './style.less'
import { usePage } from '@/hooks/useTable'
import { Button } from 'antd'
import { getPlanningSubclassList } from '@/api/planningOverview/subclass'
import HsAdminTablePage from '@/components/HsAdminTablePage'

const TablePage: React.FC = () => {
  const [dataSource, setDataSource] = useState([])
  const columns = [
    {
      title: '表编码',
      dataIndex: 'uni_code',
      key: 'uni_code'
    },
    {
      title: '表名（中文）',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description'
    }
  ]

  const doRequest = () => {
    return getPlanningSubclassList({
      page: pagination.current,
      page_size: pagination.pageSize
    }).then((res) => {
      setDataSource(res.items)
      return res
    })
  }
  const { pagination } = usePage(doRequest)

  return (
    <>
      <Button type="primary">reset Button</Button>
      <br />
      <HsAdminTablePage columns={columns} rowKey="id" dataSource={dataSource} pagination={pagination}></HsAdminTablePage>
    </>
  )
}

export default TablePage
