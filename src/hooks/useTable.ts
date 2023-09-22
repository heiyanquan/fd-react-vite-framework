import { useState, useEffect } from 'react'

interface SetStatePage {
  current: number
  pageSize: number
  total: number
  showSizeChanger: boolean
  showQuickJumper: boolean
  pageSizeOptions: number[]
  showTotal: (total: number) => string
  onChange: (page: number, pageSize: number) => void
}

export const usePage: any = (doRequest: () => Promise<any>) => {
  const [pagination, setPagination] = useState<SetStatePage>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
    pageSizeOptions: [10, 20, 30, 40],
    onChange: (page: number, pageSize: number) => {
      if (pageSize !== pagination.pageSize) {
        setPagination({ ...pagination, pageSize, current: 1 })
      } else {
        setPagination({ ...pagination, current: page, pageSize })
      }
    }
  })

  const resetPage = () => {
    setPagination({
      ...pagination,
      current: 1,
      pageSize: 10
    })
  }

  useEffect(() => {
    doRequest().then((res) => {
      setPagination({
        ...pagination,
        total: res.total
      })
    })
  }, [pagination.current, pagination.pageSize])

  return { pagination, resetPage, setPagination }
}
