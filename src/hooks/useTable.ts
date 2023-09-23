import { useState, useEffect } from 'react'

interface SetStatePage {
  current: number
  pageSize: number
  showSizeChanger: boolean
  showQuickJumper: boolean
  pageSizeOptions: number[]
  showTotal: (total: number) => string
}

export const usePage: any = (doRequest: () => Promise<any>) => {
  const [pagination, setPagination] = useState<SetStatePage>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
    pageSizeOptions: [10, 20, 30, 40]
  })
  const [total, setTotal] = useState(0)

  function onChange(page: number, pageSize: number) {
    if (pageSize !== pagination.pageSize) {
      setPagination((pagi) => ({ ...pagi, current: 1, pageSize }))
    } else {
      setPagination((pagi) => ({ ...pagi, current: page }))
    }
  }

  const resetPage = () => {
    setPagination({
      ...pagination,
      current: 1,
      pageSize: 10
    })
  }

  useEffect(() => {
    doRequest().then((res) => {
      if (typeof res === 'object') {
        setTotal(res.total)
      }
    })
  }, [pagination])

  return {
    pagination: {
      ...pagination,
      total,
      onChange
    },
    total,
    setPagination,
    setTotal,
    onChange,
    resetPage
  }
}
