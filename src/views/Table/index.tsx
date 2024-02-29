import React, { useState } from 'react'
import './style.less'
import { usePage } from '@/hooks/useTable'
import { Button } from 'antd'
import { getPlanningSubclassList } from '@/api/planningOverview/subclass'
import HsAdminTable from './HsAdminTable'

const TablePage: React.FC = () => {
  const [dataSource, setDataSource] = useState([])
  const columns = [
    {
      title: '表编码',
      dataIndex: 'uni_code',
      width: 400
    },
    {
      title: '表名（中文）',
      dataIndex: 'name',
      width: 400
    },
    {
      title: '表名（英文）',
      dataIndex: 'en_name',
      width: 400
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
      <HsAdminTable columns={columns} rowKey="id" dataSource={dataSource} pagination={false}></HsAdminTable>
    </>
  )
}

export default TablePage
