import React, { useCallback, useState, useEffect } from 'react'
import './style.less'
import { Button, Table, Pagination } from 'antd'
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
  const [pagination, setPagination] = useState<any>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
    pageSizeOptions: [10, 20, 30, 40]
  })
  const [total, settotal] = useState(0)

  function onChange(page: number, pageSize: number) {
    if (pageSize !== pagination.pageSize) {
      setPagination((pagi) => ({ ...pagi, current: 1, pageSize }))
    } else {
      setPagination((pagi) => ({ ...pagi, current: page }))
    }
  }

  const doRequest = useCallback(() => {
    console.log('doRequest', pagination)
    return getPlanningSubclassList({
      page: pagination.current,
      page_size: pagination.pageSize
    }).then((res) => {
      setDataSource(res.items)
      settotal(res.total)
      return res
    })
  }, [pagination])

  useEffect(() => {
    console.log('useEffect', pagination)
    doRequest()
  }, [pagination, doRequest])

  return (
    <>
      <Button type="primary">reset Button</Button>
      <br />
      <Table columns={columns} rowKey="id" dataSource={dataSource} pagination={false}></Table>
      <Pagination {...pagination} total={total} onChange={onChange} />
    </>
  )
}

export default TablePage
