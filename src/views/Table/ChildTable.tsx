import { hsHandleTableDate, hsHandleTableDateTime, hsHandleTableRender } from '@/utils/table'
import { Table, Pagination } from 'antd'

const ChildTable = (props: any) => {
  const { pagination, columns, ...rest } = props
  const style = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16
  }
  columns?.forEach((item) => {
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
      <Table columns={columns} {...rest} pagination={false} />
      <div style={style}>
        <Pagination {...pagination} />
      </div>
    </>
  )
}

export default ChildTable
