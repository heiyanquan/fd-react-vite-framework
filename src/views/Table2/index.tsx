import React, { useEffect, useState } from 'react'
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
  const [columns, setColumns] = useState<any[]>([
    {
      title: '表编码',
      dataIndex: 'uni_code'
    },
    {
      title: '表名（中文）',
      dataIndex: 'name'
    },
    {
      title: '描述',
      dataIndex: 'description'
    }
  ])
  const [columns2, setColumns2] = useState<any[]>([
    {
      title: '表编码',
      dataIndex: 'uni_code'
    },
    {
      title: '表名（中文）',
      dataIndex: 'name'
    },
    {
      title: '描述',
      dataIndex: 'description'
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
  const handleResize2 =
    (index: number) =>
    (_: any, { size }: any) => {
      const newColumns = [...columns2]
      newColumns[index] = {
        ...newColumns[index],
        width: size.width
      }
      setColumns2(newColumns)
    }
  const mergeColumns = columns.map((col: any, index) => ({
    ...col,
    render: (text: string) => {
      return (
        //统一render
        <div style={{ width: col.width, ...textEllipsis }}>{text}</div>
      )
    },
    onHeaderCell: (column: { width: any }) => {
      return {
        width: column.width ?? 80,
        onResize: handleResize(index)
      }
    }
  }))
  const mergeColumns2 = columns2.map((col: any, index) => ({
    ...col,
    render: (text: string) => {
      return (
        //统一render
        <div style={{ width: col.width, ...textEllipsis }}>{text}</div>
      )
    },
    onHeaderCell: (column: { width: any }) => {
      return {
        width: column.width ?? 80,
        onResize: handleResize2(index)
      }
    }
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

  useEffect(() => {
    if (dataSource.length) {
      Promise.resolve().then(() => {
        const getTableHeadWidth = (
          id: string,
          setColumns: { (value: React.SetStateAction<any[]>): void; (value: React.SetStateAction<any[]>): void; (arg0: (prev: any) => any): void }
        ) => {
          setColumns((prev) => {
            let tableThead: any
            if (document.getElementById(id)) {
              tableThead = document.querySelector(`#${id} .ant-table-thead`)
            } else {
              tableThead = document.getElementsByClassName('ant-table-thead')[0]
            }
            if (!tableThead) {
              return prev
            }
            const trChildren = tableThead.children
            const tdList = trChildren[0].children
            for (const [key, value] of [...tdList].entries()) {
              const computedStyles = window.getComputedStyle(value)
              const paddingLeft = parseFloat(computedStyles['paddingLeft'])
              const paddingRight = parseFloat(computedStyles['paddingRight'])
              prev[key].width = value.clientWidth - paddingLeft - paddingRight
            }
            return [...prev]
          })
        }
        getTableHeadWidth('J_table1', setColumns)
        getTableHeadWidth('J_table2', setColumns2)
      })
    }
  }, [dataSource])

  return (
    <div className="resizeTable">
      <Table
        id="J_table1"
        columns={mergeColumns}
        rowKey="id"
        dataSource={dataSource}
        pagination={false}
        components={{
          header: {
            cell: ResizableTitle
          }
        }}></Table>
      <Table
        id="J_table2"
        columns={mergeColumns2}
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
