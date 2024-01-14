import React, { useState } from 'react'
import './style.less'
import { usePage } from '@/hooks/useTable'
import { getPlanningSubclassList } from '@/api/planningOverview/subclass'
import { HsAdminTablePage } from '@react-admin/pro-components'
import { Table } from 'antd'

const TablePage: React.FC = () => {
  const [dataSource, setDataSource] = useState([])
  const columns = [
    {
      title: '表编码',
      dataIndex: 'uni_code',
      width: 100
    },
    {
      title: '表名（中文）',
      dataIndex: 'name',
      width: 110
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 120
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
      <Table columns={columns} rowKey="id" dataSource={dataSource} pagination={false}></Table>
      <HsAdminTablePage columns={columns} rowKey="id" dataSource={dataSource} pagination={pagination}></HsAdminTablePage>
    </>
  )
}

export default TablePage
