import React, { useState, useEffect } from 'react'
import './style.less'
import ChildTable from './ChildTable'
import { usePage } from '@/hooks/useTable'
import { Button } from 'antd'
import { getPlanningDataSheetList } from '@/api/planningOverview/dataSheet'

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
      dataIndex: 'cn_table_name',
      key: 'cn_table_name'
    },
    {
      title: '时间',
      dataIndex: 'planned_completion_date',
      key: 'planned_completion_date',
      type: 'datetime'
    }
  ]
  const doRequest = () => {
    return getPlanningDataSheetList({
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
