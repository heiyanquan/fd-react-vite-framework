import React, { useState } from 'react'
import './style.less'
import { usePage } from '@/hooks/useTable'
import { getPlanningSubclassList } from '@/api/planningOverview/subclass'
import ResizableTitle from './ResizableTitle'
import { Table } from 'antd'

const textEllipsis = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
}
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
    (index: number) =>
    (_: any, { size }: any) => {
      const newColumns = [...columns]
      newColumns[index] = {
        ...newColumns[index],
        width: size.width
      }
      setColumns(newColumns)
    }
  const mergeColumns = columns.map((col: any, index) => ({
    ...col,
    render: (text: string) => {
      return (
        //统一render
        <div style={{ width: col.width, ...textEllipsis }}>{text}</div>
      )
    },
    onHeaderCell: (column: { width: any }) => ({
      width: column.width ?? 80,
      onResize: handleResize(index)
    })
  }))

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
    <div className="resizeTable">
      <Table
        columns={mergeColumns}
        rowKey="id"
        dataSource={dataSource}
        pagination={false}
        components={{
          header: {
            cell: ResizableTitle
          }
        }}></Table>
    </div>
  )
}

export default TablePage