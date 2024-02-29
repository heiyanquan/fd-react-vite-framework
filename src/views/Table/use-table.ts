export interface ColumnsType {
  title: string
  dataIndex: string
  key: string
  type?: string
  width?: number
  render?: (text: string, record: any) => JSX.Element
}
