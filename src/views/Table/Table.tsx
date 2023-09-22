import React, { useState } from 'react'
import './style.less'
import ChildTable from './ChildTable'
import { usePage } from '@/hooks/useTable'
import { Button } from 'antd'
import { getPlanningSubclassList } from '@/api/planningOverview/subclass'

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
  const { pagination, resetPage } = usePage(doRequest)

  function reset() {
    resetPage()
  }

  return (
    <>
      <Button type="primary" onClick={reset}>
        reset Button
      </Button>
      <br />
      <ChildTable dataSource={dataSource} columns={columns} rowKey="id" pagination={pagination} />
    </>
  )
}

export default TablePage
