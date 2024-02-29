import { FC, memo, useEffect, useState } from 'react'
import type { TableProps } from 'antd'
import { Table } from 'antd'
import './style.less'
import ResizableTitle from './ResizableTitle'
import { useThrottleFn } from 'ahooks'
import type { ColumnsType } from './use-table'

interface Props extends TableProps<ColumnsType> {
  columns?: any[]
  dataSource?: any[]
  id?: string
  rowSelection?: any
}

const HsAdminTable: FC<Props> = (props: Props) => {
  const { columns, dataSource, id, ...rest } = props
  const [mergeColumns, setMergeColumns] = useState<any[]>([])
  const { run } = useThrottleFn(
    (index, size) => {
      setMergeColumns((prev: any[]) => {
        prev[index].width = size.width
        return [...prev]
      })
    },
    { wait: 20 }
  )

  useEffect(() => {
    if (columns?.length)
      setMergeColumns(
        columns.map((item: ColumnsType, index: number) => {
          return {
            ...item,
            onHeaderCell: (column: { width: any }) => {
              return {
                width: column.width ?? 0,
                onResize: (e: any, { size }: any) => {
                  e.preventDefault()
                  e.stopPropagation()
                  run(index, size)
                }
              }
            }
          }
        })
      )
  }, [columns, run])

  return (
    <Table
      columns={mergeColumns}
      dataSource={dataSource}
      id={id}
      components={{
        header: {
          cell: ResizableTitle
        }
      }}
      className="hs-admin-base-table"
      {...rest}></Table>
  )
}

export default memo(HsAdminTable)
