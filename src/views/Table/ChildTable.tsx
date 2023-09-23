import { hsHandleTableDate, hsHandleTableDateTime, hsHandleTableRender } from '@/utils/table'
import { Table, Pagination } from 'antd'

interface ColumnsType {
  title: string
  dataIndex: string
  key: string
  type?: string
  render?: (text: string) => JSX.Element
}
const ChildTable = (props: any) => {
  const { pagination, columns, ...rest } = props
  const style = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16
  }
  columns?.forEach((item: ColumnsType) => {
    if (item.type === 'date') {
      item.render = (text: string) => <span>{hsHandleTableDate(text)}</span>
    } else if (item.type === 'datetime') {
      item.render = (text: string) => <span>{hsHandleTableDateTime(text)}</span>
    } else {
      item.render = (text: string) => <span>{hsHandleTableRender(text)}</span>
    }
  })

  return (
    <>
      <Table columns={columns} {...rest} pagination={false}></Table>
      <div style={style}>
        <Pagination {...pagination} />
      </div>
    </>
  )
}

export default ChildTable
