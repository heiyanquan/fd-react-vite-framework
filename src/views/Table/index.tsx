import React, { useMemo, useState } from 'react'
import './style.less'
import { usePage } from '@/hooks/useTable'
import { getPlanningSubclassList } from '@/api/planningOverview/subclass'
import { HsAdminTablePage } from '@react-admin/pro-components'
import ResizableTitle from './ResizableTitle'
import { Table } from 'antd'

const TablePage: React.FC = () => {
  const [dataSource, setDataSource] = useState([])
  const [columns, setColumns] = useState([
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
  ])

  const handleResize =
    (info: { title?: string; dataIndex: any }) =>
    (_e: any, { size }: any) => {
      setColumns((values) => {
        return values.map((item) => {
          if (item.dataIndex === info.dataIndex) {
            console.log('[ info.dataIndex ] >', info.dataIndex, size)
            return {
              ...item,
              width: size.width
            }
          } else {
            return item
          }
        })
      })
    }
  const columnsList = useMemo(() => {
    return columns.map((col) => {
      return {
        ...col,
        onHeaderCell: (column: { width: any }) => {
          return {
            width: column.width,
            onResize: handleResize(col)
          }
        }
      }
    })
  }, [columns])

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
      <Table
        columns={columnsList}
        rowKey="id"
        dataSource={dataSource}
        pagination={false}
        components={{
          header: {
            cell: ResizableTitle
          }
        }}></Table>
      <HsAdminTablePage
        columns={columnsList}
        rowKey="id"
        dataSource={dataSource}
        pagination={pagination}
        components={{
          header: {
            cell: ResizableTitle
          }
        }}></HsAdminTablePage>
    </>
  )
}

export default TablePage
